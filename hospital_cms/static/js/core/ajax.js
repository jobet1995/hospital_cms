/**
 * Reusable AJAX Service with Django CSRF Support
 */
import { Utils } from './utils.js';

class AjaxService {
    constructor() {
        this.csrfToken = Utils.getCookie('csrftoken');
        this.init();
    }

    init() {
        $.ajaxSetup({
            headers: { 'X-CSRFToken': this.csrfToken }
        });
    }

    /**
     * Standardized result wrapper for all project AJAX responses
     */
    handleResponse(url, type, response) {
        // Professional Console Logging
        console.groupCollapsed(`[AJAX ${type}] ${url}`);
        console.log('Status: Success');
        console.log('Response JSON:', response);
        console.groupEnd();

        // Project-wide success criteria
        if (response && (response.status === 'success' || response.success === true)) {
            return response;
        }
        
        // Handle logic errors returned as 200 OK by Django (common pattern)
        const error = new Error(response.message || 'Server logic error');
        error.response = response;
        throw error;
    }

    async get(url, params = {}) {
        console.log(`[AJAX REQUEST] GET: ${url}`, params);
        try {
            const response = await $.ajax({
                url, type: 'GET', data: params, dataType: 'json'
            });
            return this.handleResponse(url, 'GET', response);
        } catch (xhr) {
            throw this.handleError(url, 'GET', xhr);
        }
    }

    async post(url, data = {}) {
        console.log(`[AJAX REQUEST] POST: ${url}`, data);
        try {
            const response = await $.ajax({
                url, type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                dataType: 'json'
            });
            return this.handleResponse(url, 'POST', response);
        } catch (xhr) {
            throw this.handleError(url, 'POST', xhr);
        }
    }

    handleError(url, type, xhr) {
        // Advanced error parsing for Django
        const error = new Error(xhr.responseJSON?.message || 'Server Connection Failed');
        error.status = xhr.status;
        error.responseJSON = xhr.responseJSON;
        
        console.group(`[AJAX ERROR ${xhr.status}] ${type} ${url}`);
        console.error('Message:', error.message);
        if (xhr.responseJSON) console.log('Response JSON:', xhr.responseJSON);
        console.groupEnd();

        return error;
    }
}

export default new AjaxService();
