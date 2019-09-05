/******/ (function(modules) { // webpackBootstrap
        /******/ 	// The module cache
        /******/ 	var installedModules = {};
        /******/
        /******/ 	// The require function
        /******/ 	function __webpack_require__(moduleId) {
                /******/
                /******/ 		// Check if module is in cache
                /******/ 		if(installedModules[moduleId]) {
                        /******/ 			return installedModules[moduleId].exports;
                        /******/ 		}
                /******/ 		// Create a new module (and put it into the cache)
                /******/ 		var module = installedModules[moduleId] = {
                        /******/ 			i: moduleId,
                        /******/ 			l: false,
                        /******/ 			exports: {}
                        /******/ 		};
                /******/
                /******/ 		// Execute the module function
                /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                /******/
                /******/ 		// Flag the module as loaded
                /******/ 		module.l = true;
                /******/
                /******/ 		// Return the exports of the module
                /******/ 		return module.exports;
                /******/ 	}
        /******/
        /******/
        /******/ 	// expose the modules object (__webpack_modules__)
        /******/ 	__webpack_require__.m = modules;
        /******/
        /******/ 	// expose the module cache
        /******/ 	__webpack_require__.c = installedModules;
        /******/
        /******/ 	// define getter function for harmony exports
        /******/ 	__webpack_require__.d = function(exports, name, getter) {
                /******/ 		if(!__webpack_require__.o(exports, name)) {
                        /******/ 			Object.defineProperty(exports, name, {
                                /******/ 				configurable: false,
                                /******/ 				enumerable: true,
                                /******/ 				get: getter
                                /******/ 			});
                        /******/ 		}
                /******/ 	};
        /******/
        /******/ 	// getDefaultExport function for compatibility with non-harmony modules
        /******/ 	__webpack_require__.n = function(module) {
                /******/ 		var getter = module && module.__esModule ?
                    /******/ 			function getDefault() { return module['default']; } :
                    /******/ 			function getModuleExports() { return module; };
                /******/ 		__webpack_require__.d(getter, 'a', getter);
                /******/ 		return getter;
                /******/ 	};
        /******/
        /******/ 	// Object.prototype.hasOwnProperty.call
        /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
        /******/
        /******/ 	// __webpack_public_path__
        /******/ 	__webpack_require__.p = "";
        /******/
        /******/ 	// Load entry module and return exports
        /******/ 	return __webpack_require__(__webpack_require__.s = 0);
        /******/ })
/************************************************************************/
/******/ ([
        /* 0 */
        /***/ (function(module, exports) {

                eval("var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * Iramely oembed scripts\n */\nvar __ = wp.i18n.__;\nvar createHigherOrderComponent = wp.compose.createHigherOrderComponent;\nvar Fragment = wp.element.Fragment;\nvar InspectorControls = wp.blockEditor.InspectorControls;\n\nvar iEvent = new RegExp(\"setIframelyEmbedOptions\");\nvar PanelBody = wp.components.PanelBody;\n\n\nfunction findIframeByContentWindow(iframes, contentWindow) {\n    var foundIframe = void 0;\n    for (var i = 0; i < iframes.length && !foundIframe; i++) {\n        var iframe = iframes[i];\n        if (iframe.contentWindow === contentWindow) {\n            foundIframe = iframe;\n        }\n    }\n    return foundIframe;\n}\n\nfunction sortObject(obj) {\n    return Object.keys(obj).sort().reduce(function (acc, key) {\n        if (Array.isArray(obj[key])) {\n            acc[key] = obj[key].map(sortObjectKeys);\n        }\n        if (_typeof(obj[key]) === 'object') {\n            acc[key] = sortObjectKeys(obj[key]);\n        } else {\n            acc[key] = obj[key];\n        }\n        return acc;\n    }, {});\n}\n\nfunction updateIframe(id, query) {\n    // block options interaction\n    var clientId = id.split(\"div#block-\")[1],\n        blockAttrs = wp.data.select('core/block-editor').getBlockAttributes(clientId),\n        url = blockAttrs.url,\n        iframely_key = '&iframely=';\n\n    // Parse url and make sure we are replacing an url query string properly\n    if (url.indexOf('iframely=') > 0) {\n        var durl = url.split('iframely=')[0];\n        url = durl.substr(0, durl.length - 1);\n    }\n    if (url.indexOf('?') === -1) {\n        iframely_key = '?iframely=';\n    }\n\n    // Ensure sorted options object to make sure\n    // we generating same data each time for same options.\n    query = sortObject(query);\n    //query.timestamp = new Date();\n\n    // Join the url string with iframely params\n    var params = iframely_key + encodeURIComponent(window.btoa(JSON.stringify(query)));\n    var newUrl = url + params;\n\n    // Update the corresponding block and get a preview if required\n    wp.data.dispatch('core/block-editor').updateBlockAttributes([clientId], { url: newUrl });\n    var prUrl = void 0,\n        preview = wp.data.select('core').getEmbedPreview(newUrl);\n\n    if (preview) {\n        // This returns cached preview if we have any\n\n        // TODO: this is wrong. we should find a standard hook to update an embed with cached preview.\n        var wpIframe = $('div[data-block=' + clientId + ']').find('iframe').contents().get(0);\n        //let iframelyDiv = $(wpIframe).find('div.iframely-embed').get(0);\n        //$(iframelyDiv).html(preview.html+\"\");\n        var preview_url = 'https:' + $(preview.html).find('a').attr('data-iframely-url');\n        $('div[data-block=' + clientId + ']').find('iframe').get(0).src = preview_url;\n        // $('div[data-block='+clientId+']').find('iframe').each(function() {\n        //     let dz = $('div', this.contentWindow.document||this.contentDocument).get(0);\n        //     $(dz).html(preview.html);\n        // });\n    }\n}\n\nif (iframely) {\n    // Failsafe in case of iframely name space not accessible.\n    // E.g. no internet connection\n    iframely.on('options-changed', function (id, formContainer, query) {\n        updateIframe(id, query);\n    });\n}\n\nfunction initListener() {\n    window.addEventListener(\"message\", function (e) {\n        if (iEvent.test(e.data)) {\n            var frames = document.getElementsByTagName(\"iframe\"),\n                iframe = findIframeByContentWindow(frames, e.source);\n            $(iframe).data(JSON.parse(e.data));\n        }\n    }, false);\n}\ninitListener();\n\nvar IframelyOptions = function (_React$Component) {\n    _inherits(IframelyOptions, _React$Component);\n\n    function IframelyOptions() {\n        _classCallCheck(this, IframelyOptions);\n\n        return _possibleConstructorReturn(this, (IframelyOptions.__proto__ || Object.getPrototypeOf(IframelyOptions)).apply(this, arguments));\n    }\n\n    _createClass(IframelyOptions, [{\n        key: \"componentDidMount\",\n        value: function componentDidMount() {\n            iframely.buildOptionsForm(this.props.selector, $('div#ifopts').get(0), this.props.options.data);\n        }\n    }, {\n        key: \"render\",\n        value: function render() {\n            // console.log('data: ', this.props.options.data);\n            return wp.element.createElement(\n                \"div\",\n                { id: \"ifopts\",\n                    \"data-id\": this.props.clientId,\n                    \"data-opts\": JSON.stringify(this.props.options.data)\n                },\n                this.body\n            );\n        }\n    }]);\n\n    return IframelyOptions;\n}(React.Component);\n\nIframelyOptions.defaultProps = {\n    body: '',\n    clientId: '',\n    selector: '',\n    options: ''\n};\nvar withInspectorControls = createHigherOrderComponent(function (BlockEdit) {\n    return function (props) {\n        var fragment = wp.element.createElement(\n            Fragment,\n            null,\n            wp.element.createElement(BlockEdit, props)\n        );\n        if (props.isSelected === true && (props.name === \"core/embed\" || props.name.startsWith(\"core-embed\"))) {\n            var selector = 'div#block-' + props.clientId;\n            var options = $(selector).find('iframe').data();\n            if (!options || !options.data) {\n                return fragment;\n            }\n            return wp.element.createElement(\n                Fragment,\n                null,\n                wp.element.createElement(BlockEdit, props),\n                wp.element.createElement(\n                    InspectorControls,\n                    null,\n                    wp.element.createElement(\n                        PanelBody,\n                        { title: \"Iframely options\" },\n                        wp.element.createElement(IframelyOptions, { selector: selector, options: options, clientId: props.clientId })\n                    )\n                )\n            );\n        } else {\n            return fragment;\n        }\n    };\n}, \"withInspectorControl\");\n\nwp.hooks.addFilter('editor.BlockEdit', 'iframely/with-inspector-controls', withInspectorControls);\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/OTU1MiJdLCJuYW1lcyI6WyJfXyIsIndwIiwiaTE4biIsImNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50IiwiY29tcG9zZSIsIkZyYWdtZW50IiwiZWxlbWVudCIsIkluc3BlY3RvckNvbnRyb2xzIiwiYmxvY2tFZGl0b3IiLCJpRXZlbnQiLCJSZWdFeHAiLCJQYW5lbEJvZHkiLCJjb21wb25lbnRzIiwiZmluZElmcmFtZUJ5Q29udGVudFdpbmRvdyIsImlmcmFtZXMiLCJjb250ZW50V2luZG93IiwiZm91bmRJZnJhbWUiLCJpIiwibGVuZ3RoIiwiaWZyYW1lIiwic29ydE9iamVjdCIsIm9iaiIsIk9iamVjdCIsImtleXMiLCJzb3J0IiwicmVkdWNlIiwiYWNjIiwia2V5IiwiQXJyYXkiLCJpc0FycmF5IiwibWFwIiwic29ydE9iamVjdEtleXMiLCJ1cGRhdGVJZnJhbWUiLCJpZCIsInF1ZXJ5IiwiY2xpZW50SWQiLCJzcGxpdCIsImJsb2NrQXR0cnMiLCJkYXRhIiwic2VsZWN0IiwiZ2V0QmxvY2tBdHRyaWJ1dGVzIiwidXJsIiwiaWZyYW1lbHlfa2V5IiwiaW5kZXhPZiIsImR1cmwiLCJzdWJzdHIiLCJwYXJhbXMiLCJlbmNvZGVVUklDb21wb25lbnQiLCJ3aW5kb3ciLCJidG9hIiwiSlNPTiIsInN0cmluZ2lmeSIsIm5ld1VybCIsImRpc3BhdGNoIiwidXBkYXRlQmxvY2tBdHRyaWJ1dGVzIiwicHJVcmwiLCJwcmV2aWV3IiwiZ2V0RW1iZWRQcmV2aWV3Iiwid3BJZnJhbWUiLCIkIiwiZmluZCIsImNvbnRlbnRzIiwiZ2V0IiwicHJldmlld191cmwiLCJodG1sIiwiYXR0ciIsInNyYyIsImlmcmFtZWx5Iiwib24iLCJmb3JtQ29udGFpbmVyIiwiaW5pdExpc3RlbmVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0ZXN0IiwiZnJhbWVzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInNvdXJjZSIsInBhcnNlIiwiSWZyYW1lbHlPcHRpb25zIiwiYnVpbGRPcHRpb25zRm9ybSIsInByb3BzIiwic2VsZWN0b3IiLCJvcHRpb25zIiwiYm9keSIsIlJlYWN0IiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwid2l0aEluc3BlY3RvckNvbnRyb2xzIiwiQmxvY2tFZGl0IiwiZnJhZ21lbnQiLCJpc1NlbGVjdGVkIiwibmFtZSIsInN0YXJ0c1dpdGgiLCJob29rcyIsImFkZEZpbHRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7SUFHUUEsRSxHQUFPQyxHQUFHQyxJLENBQVZGLEU7SUFDQUcsMEIsR0FBK0JGLEdBQUdHLE8sQ0FBbENELDBCO0lBQ0FFLFEsR0FBYUosR0FBR0ssTyxDQUFoQkQsUTtJQUNBRSxpQixHQUFzQk4sR0FBR08sVyxDQUF6QkQsaUI7O0FBQ1IsSUFBTUUsU0FBUyxJQUFJQyxNQUFKLENBQVcseUJBQVgsQ0FBZjtJQUNRQyxTLEdBQWNWLEdBQUdXLFUsQ0FBakJELFM7OztBQUVSLFNBQVNFLHlCQUFULENBQW1DQyxPQUFuQyxFQUE0Q0MsYUFBNUMsRUFBMkQ7QUFDdkQsUUFBSUMsb0JBQUo7QUFDQSxTQUFJLElBQUlDLElBQUksQ0FBWixFQUFlQSxJQUFJSCxRQUFRSSxNQUFaLElBQXNCLENBQUNGLFdBQXRDLEVBQW1EQyxHQUFuRCxFQUF3RDtBQUNwRCxZQUFJRSxTQUFTTCxRQUFRRyxDQUFSLENBQWI7QUFDQSxZQUFJRSxPQUFPSixhQUFQLEtBQXlCQSxhQUE3QixFQUE0QztBQUN4Q0MsMEJBQWNHLE1BQWQ7QUFDSDtBQUNKO0FBQ0QsV0FBT0gsV0FBUDtBQUNIOztBQUVELFNBQVNJLFVBQVQsQ0FBb0JDLEdBQXBCLEVBQXdCO0FBQ3BCLFdBQU9DLE9BQU9DLElBQVAsQ0FBWUYsR0FBWixFQUFpQkcsSUFBakIsR0FBd0JDLE1BQXhCLENBQStCLFVBQUNDLEdBQUQsRUFBS0MsR0FBTCxFQUFXO0FBQzdDLFlBQUlDLE1BQU1DLE9BQU4sQ0FBY1IsSUFBSU0s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QUFELEVBQWdCVCxLQUFoQjtBQUFWLFNBQWhCO0FBQ0EsWUFBSUEsTUFBTVUsVUFBTixLQUFtQixJQUFuQixLQUE0QlYsTUFBTVcsSUFBTixLQUFlLFlBQWYsSUFBK0JYLE1BQU1XLElBQU4sQ0FBV0MsVUFBWCxDQUFzQixZQUF0QixDQUEzRCxDQUFKLEVBQXFHO0FBQ2pHLGdCQUFJWCxXQUFXLGVBQWVELE1BQU05QyxRQUFwQztBQUNBLGdCQUFJZ0QsVUFBVXhCLEVBQUV1QixRQUFGLEVBQVl0QixJQUFaLENBQWlCLFFBQWpCLEVBQTJCdEIsSUFBM0IsRUFBZDtBQUNBLGdCQUFJLENBQUM2QyxPQUFELElBQVksQ0FBQ0EsUUFBUTdDLElBQXpCLEVBQStCO0FBQzNCLHVCQUFPb0QsUUFBUDtBQUNIO0FBQ0QsbUJBQ0k7QUFBQyx3QkFBRDtBQUFBO0FBQ0kseUNBQUMsU0FBRCxFQUFnQlQsS0FBaEIsQ0FESjtBQUVJO0FBQUMscUNBQUQ7QUFBQTtBQUNRO0FBQUMsaUNBQUQ7QUFBQSwwQkFBVyxPQUFNLGtCQUFqQjtBQUNJLGlEQUFDLGVBQUQsSUFBaUIsVUFBV0MsUUFBNUIsRUFBdUMsU0FBVUMsT0FBakQsRUFBMkQsVUFBV0YsTUFBTTlDLFFBQTVFO0FBREo7QUFEUjtBQUZKLGFBREo7QUFVSCxTQWhCRCxNQWdCTztBQUNILG1CQUFPdUQsUUFBUDtBQUNIO0FBQ0osS0FyQkQ7QUFzQkgsQ0F2QjhCLEVBdUI1QixzQkF2QjRCLENBQS9COztBQXlCQXpGLEdBQUc2RixLQUFILENBQVNDLFNBQVQsQ0FBb0Isa0JBQXBCLEVBQXdDLGtDQUF4QyxFQUE0RVAscUJBQTVFIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIElyYW1lbHkgb2VtYmVkIHNjcmlwdHNcbiAqL1xuY29uc3QgeyBfXyB9ID0gd3AuaTE4bjtcbmNvbnN0IHsgY3JlYXRlSGlnaGVyT3JkZXJDb21wb25lbnQgfSA9IHdwLmNvbXBvc2U7XG5jb25zdCB7IEZyYWdtZW50IH0gPSB3cC5lbGVtZW50O1xuY29uc3QgeyBJbnNwZWN0b3JDb250cm9scyB9ID0gd3AuYmxvY2tFZGl0b3I7XG5jb25zdCBpRXZlbnQgPSBuZXcgUmVnRXhwKFwic2V0SWZyYW1lbHlFbWJlZE9wdGlvbnNcIik7XG5jb25zdCB7IFBhbmVsQm9keSB9ID0gd3AuY29tcG9uZW50cztcblxuZnVuY3Rpb24gZmluZElmcmFtZUJ5Q29udGVudFdpbmRvdyhpZnJhbWVzLCBjb250ZW50V2luZG93KSB7XG4gICAgbGV0IGZvdW5kSWZyYW1lO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpZnJhbWVzLmxlbmd0aCAmJiAhZm91bmRJZnJhbWU7IGkrKykge1xuICAgICAgICBsZXQgaWZyYW1lID0gaWZyYW1lc1tpXTtcbiAgICAgICAgaWYgKGlmcmFtZS5jb250ZW50V2luZG93ID09PSBjb250ZW50V2luZG93KSB7XG4gICAgICAgICAgICBmb3VuZElmcmFtZSA9IGlmcmFtZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZm91bmRJZnJhbWU7XG59XG5cbmZ1bmN0aW9uIHNvcnRPYmplY3Qob2JqKXtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5zb3J0KCkucmVkdWNlKChhY2Msa2V5KT0+e1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmpba2V5XSkpe1xuICAgICAgICAgICAgYWNjW2tleV09b2JqW2tleV0ubWFwKHNvcnRPYmplY3RLZXlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG9ialtrZXldID09PSAnb2JqZWN0Jyl7XG4gICAgICAgICAgICBhY2Nba2V5XT1zb3J0T2JqZWN0S2V5cyhvYmpba2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGFjY1trZXldPW9ialtrZXldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSx7fSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUlmcmFtZShpZCwgcXVlcnkpIHtcbiAgICAvLyBibG9jayBvcHRpb25zIGludGVyYWN0aW9uXG4gICAgbGV0IGNsaWVudElkID0gaWQuc3BsaXQoXCJkaXYjYmxvY2stXCIpWzFdLFxuICAgICAgICBibG9ja0F0dHJzID0gd3AuZGF0YS5zZWxlY3QoJ2NvcmUvYmxvY2stZWRpdG9yJykuZ2V0QmxvY2tBdHRyaWJ1dGVzKGNsaWVudElkKSxcbiAgICAgICAgdXJsID0gYmxvY2tBdHRycy51cmwsXG4gICAgICAgIGlmcmFtZWx5X2tleSA9ICcmaWZyYW1lbHk9JztcblxuICAgIC8vIFBhcnNlIHVybCBhbmQgbWFrZSBzdXJlIHdlIGFyZSByZXBsYWNpbmcgYW4gdXJsIHF1ZXJ5IHN0cmluZyBwcm9wZXJseVxuICAgIGlmKHVybC5pbmRleE9mKCdpZnJhbWVseT0nKSA+IDApIHtcbiAgICAgICAgbGV0IGR1cmwgPSB1cmwuc3BsaXQoJ2lmcmFtZWx5PScpWzBdO1xuICAgICAgICB1cmwgPSBkdXJsLnN1YnN0cigwLCBkdXJsLmxlbmd0aC0xKTtcbiAgICB9XG4gICAgaWYodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEpIHtcbiAgICAgICAgaWZyYW1lbHlfa2V5ID0gJz9pZnJhbWVseT0nO1xuICAgIH1cblxuICAgIC8vIEVuc3VyZSBzb3J0ZWQgb3B0aW9ucyBvYmplY3QgdG8gbWFrZSBzdXJlXG4gICAgLy8gd2UgZ2VuZXJhdGluZyBzYW1lIGRhdGEgZWFjaCB0aW1lIGZvciBzYW1lIG9wdGlvbnMuXG4gICAgcXVlcnkgPSBzb3J0T2JqZWN0KHF1ZXJ5KTtcbiAgICAvL3F1ZXJ5LnRpbWVzdGFtcCA9IG5ldyBEYXRlKCk7XG5cbiAgICAvLyBKb2luIHRoZSB1cmwgc3RyaW5nIHdpdGggaWZyYW1lbHkgcGFyYW1zXG4gICAgbGV0IHBhcmFtcyA9IGlmcmFtZWx5X2tleSArIGVuY29kZVVSSUNvbXBvbmVudCh3aW5kb3cuYnRvYShKU09OLnN0cmluZ2lmeShxdWVyeSkpKTtcbiAgICBsZXQgbmV3VXJsID0gdXJsICsgcGFyYW1zO1xuXG4gICAgLy8gVXBkYXRlIHRoZSBjb3JyZXNwb25kaW5nIGJsb2NrIGFuZCBnZXQgYSBwcmV2aWV3IGlmIHJlcXVpcmVkXG4gICAgd3AuZGF0YS5kaXNwYXRjaCgnY29yZS9ibG9jay1lZGl0b3InKS51cGRhdGVCbG9ja0F0dHJpYnV0ZXMoW2NsaWVudElkXSwgeyB1cmw6IG5ld1VybCB9KTtcbiAgICBsZXQgcHJVcmwsIHByZXZpZXcgPSB3cC5kYXRhLnNlbGVjdCggJ2NvcmUnICkuZ2V0RW1iZWRQcmV2aWV3KG5ld1VybCk7XG5cbiAgICBpZiAocHJldmlldykge1xuICAgICAgICAvLyBUaGlzIHJldHVybnMgY2FjaGVkIHByZXZpZXcgaWYgd2UgaGF2ZSBhbnlcblxuICAgICAgICAvLyBUT0RPOiB0aGlzIGlzIHdyb25nLiB3ZSBzaG91bGQgZmluZCBhIHN0YW5kYXJkIGhvb2sgdG8gdXBkYXRlIGFuIGVtYmVkIHdpdGggY2FjaGVkIHByZXZpZXcuXG4gICAgICAgIGxldCB3cElmcmFtZSA9ICQoJ2RpdltkYXRhLWJsb2NrPScrY2xpZW50SWQrJ10nKS5maW5kKCdpZnJhbWUnKS5jb250ZW50cygpLmdldCgwKTtcbiAgICAgICAgLy9sZXQgaWZyYW1lbHlEaXYgPSAkKHdwSWZyYW1lKS5maW5kKCdkaXYuaWZyYW1lbHktZW1iZWQnKS5nZXQoMCk7XG4gICAgICAgIC8vJChpZnJhbWVseURpdikuaHRtbChwcmV2aWV3Lmh0bWwrXCJcIik7XG4gICAgICAgIGxldCBwcmV2aWV3X3VybCA9ICdodHRwczonICsgJChwcmV2aWV3Lmh0bWwpLmZpbmQoJ2EnKS5hdHRyKCdkYXRhLWlmcmFtZWx5LXVybCcpO1xuICAgICAgICAkKCdkaXZbZGF0YS1ibG9jaz0nK2NsaWVudElkKyddJykuZmluZCgnaWZyYW1lJykuZ2V0KDApLnNyYyA9IHByZXZpZXdfdXJsO1xuICAgICAgICAvLyAkKCdkaXZbZGF0YS1ibG9jaz0nK2NsaWVudElkKyddJykuZmluZCgnaWZyYW1lJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gICAgIGxldCBkeiA9ICQoJ2RpdicsIHRoaXMuY29udGVudFdpbmRvdy5kb2N1bWVudHx8dGhpcy5jb250ZW50RG9jdW1lbnQpLmdldCgwKTtcbiAgICAgICAgLy8gICAgICQoZHopLmh0bWwocHJldmlldy5odG1sKTtcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuXG59XG5cbmlmIChpZnJhbWVseSkge1xuICAgIC8vIEZhaWxzYWZlIGluIGNhc2Ugb2YgaWZyYW1lbHkgbmFtZSBzcGFjZSBub3QgYWNjZXNzaWJsZS5cbiAgICAvLyBFLmcuIG5vIGludGVybmV0IGNvbm5lY3Rpb25cbiAgICBpZnJhbWVseS5vbignb3B0aW9ucy1jaGFuZ2VkJywgZnVuY3Rpb24oaWQsIGZvcm1Db250YWluZXIsIHF1ZXJ5KSB7XG4gICAgICAgIHVwZGF0ZUlmcmFtZShpZCwgcXVlcnkpO1xuICAgIH0pO1xufVxuXG5cbmZ1bmN0aW9uIGluaXRMaXN0ZW5lcigpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixmdW5jdGlvbihlKXtcbiAgICAgICAgaWYoaUV2ZW50LnRlc3QoZS5kYXRhKSkge1xuICAgICAgICAgICAgbGV0IGZyYW1lcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaWZyYW1lXCIpLFxuICAgICAgICAgICAgICAgIGlmcmFtZSA9IGZpbmRJZnJhbWVCeUNvbnRlbnRXaW5kb3coZnJhbWVzLCBlLnNvdXJjZSk7XG4gICAgICAgICAgICAkKGlmcmFtZSkuZGF0YShKU09OLnBhcnNlKGUuZGF0YSkpO1xuICAgICAgICB9XG4gICAgfSxmYWxzZSk7XG59XG5pbml0TGlzdGVuZXIoKTtcblxuY2xhc3MgSWZyYW1lbHlPcHRpb25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZnJhbWVseS5idWlsZE9wdGlvbnNGb3JtKHRoaXMucHJvcHMuc2VsZWN0b3IsICQoJ2RpdiNpZm9wdHMnKS5nZXQoMCksIHRoaXMucHJvcHMub3B0aW9ucy5kYXRhKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdkYXRhOiAnLCB0aGlzLnByb3BzLm9wdGlvbnMuZGF0YSk7XG4gICAgICAgIHJldHVybiA8ZGl2IGlkPVwiaWZvcHRzXCJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS1pZD17IHRoaXMucHJvcHMuY2xpZW50SWQgfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLW9wdHM9e0pTT04uc3RyaW5naWZ5KHRoaXMucHJvcHMub3B0aW9ucy5kYXRhKX1cbiAgICAgICAgPnsgdGhpcy5ib2R5IH08L2Rpdj47XG4gICAgfVxufVxuXG5JZnJhbWVseU9wdGlvbnMuZGVmYXVsdFByb3BzID0ge1xuICAgIGJvZHk6ICcnLFxuICAgIGNsaWVudElkOiAnJyxcbiAgICBzZWxlY3RvcjogJycsXG4gICAgb3B0aW9uczogJycsXG59O1xuY29uc3Qgd2l0aEluc3BlY3RvckNvbnRyb2xzID0gIGNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50KCAoIEJsb2NrRWRpdCApID0+IHtcbiAgICByZXR1cm4gKCBwcm9wcyApID0+IHtcbiAgICAgICAgbGV0IGZyYWdtZW50ID0gKDxGcmFnbWVudD48QmxvY2tFZGl0IHsgLi4ucHJvcHMgfSAvPjwvRnJhZ21lbnQ+KTtcbiAgICAgICAgaWYgKHByb3BzLmlzU2VsZWN0ZWQ9PT10cnVlICYmIChwcm9wcy5uYW1lID09PSBcImNvcmUvZW1iZWRcIiB8fCBwcm9wcy5uYW1lLnN0YXJ0c1dpdGgoXCJjb3JlLWVtYmVkXCIpKSkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdG9yID0gJ2RpdiNibG9jay0nICsgcHJvcHMuY2xpZW50SWQ7XG4gICAgICAgICAgICBsZXQgb3B0aW9ucyA9ICQoc2VsZWN0b3IpLmZpbmQoJ2lmcmFtZScpLmRhdGEoKTtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyYWdtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8RnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgICAgIDxCbG9ja0VkaXQgeyAuLi5wcm9wcyB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxJbnNwZWN0b3JDb250cm9scz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGFuZWxCb2R5IHRpdGxlPVwiSWZyYW1lbHkgb3B0aW9uc1wiID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPElmcmFtZWx5T3B0aW9ucyBzZWxlY3Rvcj17IHNlbGVjdG9yIH0gb3B0aW9ucz17IG9wdGlvbnMgfSBjbGllbnRJZD17IHByb3BzLmNsaWVudElkIH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1BhbmVsQm9keT5cbiAgICAgICAgICAgICAgICAgICAgPC9JbnNwZWN0b3JDb250cm9scz5cbiAgICAgICAgICAgICAgICA8L0ZyYWdtZW50PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmcmFnbWVudDtcbiAgICAgICAgfVxuICAgIH07XG59LCBcIndpdGhJbnNwZWN0b3JDb250cm9sXCIgKTtcblxud3AuaG9va3MuYWRkRmlsdGVyKCAnZWRpdG9yLkJsb2NrRWRpdCcsICdpZnJhbWVseS93aXRoLWluc3BlY3Rvci1jb250cm9scycsIHdpdGhJbnNwZWN0b3JDb250cm9scyApO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n");

                /***/ })
        /******/ ]);