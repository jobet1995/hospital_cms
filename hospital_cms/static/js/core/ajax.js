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
            headers: { 
                'X-CSRFToken': this.csrfToken,
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        
        // Cache UI elements
        this.$progress = $('#ajax-progress');
        this.$spinner = $('#ajax-spinner');
    }

    /**
     * Manage UI loading state
     */
    toggleLoading(active) {
        if (active) {
            this.$progress.addClass('loading').css('width', '30%');
            this.$spinner.addClass('loading');
        } else {
            this.$progress.addClass('finish').css('width', '100%');
            this.$spinner.removeClass('loading');
            
            setTimeout(() => {
                this.$progress.removeClass('loading finish').css('width', '0%');
            }, 400);
        }
    }

    /**
     * Standardized result wrapper for all project AJAX responses
     */
    handleResponse(url, type, response, xhr) {
        const timestamp = new Date().toLocaleTimeString();
        
        // Professional Console Logging with Premium Styling
        console.groupCollapsed(`%c[REST SUCCESS] %c${type} %c${url} %c@ ${timestamp}`, 
            'color: #2ecc71; font-weight: bold;', 
            'color: #f39c12; font-weight: bold;', 
            'color: #3498db; text-decoration: underline;',
            'color: #95a5a6; font-style: italic;'
        );
        console.log('%cStatus:%c 200 OK', 'font-weight: bold;', 'color: #2ecc71;');
        console.log('%cContent-Type:%c', 'font-weight: bold;', '', xhr.getResponseHeader('Content-Type'));
        console.log('%cResponse Body:', 'font-weight: bold;', response);
        console.groupEnd();

        // Project-wide success criteria
        if (response && (response.status === 'success' || response.status === 'ok' || response.success === true)) {
            return response;
        }
        
        // Handle logic errors returned as 200 OK by Django
        const error = new Error(response.message || 'Server logic error');
        error.response = response;
        throw error;
    }

    async get(url, params = {}) {
        return this.request(url, 'GET', params);
    }

    async post(url, data = {}) {
        return this.request(url, 'POST', data);
    }

    async put(url, data = {}) {
        return this.request(url, 'PUT', data);
    }

    async patch(url, data = {}) {
        return this.request(url, 'PATCH', data);
    }

    async delete(url, data = {}) {
        return this.request(url, 'DELETE', data);
    }

    /**
     * Unified Request Handler
     */
    async request(url, type, data = {}) {
        const isGet = type === 'GET';
        const contentType = isGet ? 'application/x-www-form-urlencoded' : 'application/json';
        
        console.groupCollapsed(`%c[REST INITIATED] %c${type}: %c${url}`, 
            'color: #9b59b6; font-weight: bold;', 
            'color: #f39c12;', 
            'color: #3498db;'
        );
        console.log('%cProtocol:%c REST v1.0', 'font-weight: bold;', '');
        console.log('%cHeaders:%c', 'font-weight: bold;', '', {
            'Accept': 'application/json',
            'Content-Type': contentType,
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': '[HIDDEN]'
        });
        if (!isGet) console.log('%cPayload:%c', 'font-weight: bold;', '', data);
        console.groupEnd();

        this.toggleLoading(true);

        try {
            const config = {
                url,
                type,
                dataType: 'json',
                contentType: contentType
            };

            if (isGet) {
                config.data = data;
            } else {
                config.data = JSON.stringify(data);
            }

            // Using standard jqXHR for header access
            const xhr = $.ajax(config);
            const response = await xhr;
            
            this.toggleLoading(false);
            return this.handleResponse(url, type, response, xhr);
        } catch (xhr) {
            this.toggleLoading(false);
            throw this.handleError(url, type, xhr);
        }
    }

    handleError(url, type, xhr) {
        const timestamp = new Date().toLocaleTimeString();
        const status = xhr.status || 'Connection Error';
        const message = xhr.responseJSON?.message || xhr.statusText || 'Server Connection Failed';
        
        const error = new Error(message);
        error.status = status;
        error.responseJSON = xhr.responseJSON;
        
        console.group(`%c[REST ERROR] %c${status} %c${type} %c${url} %c@ ${timestamp}`, 
            'color: #e74c3c; font-weight: bold;', 
            'color: #ffffff; background: #e74c3c; padding: 2px 4px; border-radius: 2px;',
            'color: #f39c12; font-weight: bold;',
            'color: #3498db; text-decoration: underline;',
            'color: #95a5a6; font-style: italic;'
        );
        console.error('%cMessage:%c', 'font-weight: bold;', '', message);
        console.log('%cContent-Type:%c', 'font-weight: bold;', '', xhr.getResponseHeader('Content-Type'));
        if (xhr.responseJSON) {
            console.log('%cResponse JSON:', 'font-weight: bold;', xhr.responseJSON);
        } else if (xhr.responseText) {
            console.log('%cResponse Text:', 'font-weight: bold;', xhr.responseText);
        }
        console.groupEnd();

        return error;
    }
}

export default new AjaxService();
