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

        eval("var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * Iramely oembed scripts\n */\nvar __ = wp.i18n.__;\nvar createHigherOrderComponent = wp.compose.createHigherOrderComponent;\nvar Fragment = wp.element.Fragment;\nvar InspectorControls = wp.blockEditor.InspectorControls;\n\nvar iEvent = new RegExp(\"setIframelyEmbedOptions\");\nvar PanelBody = wp.components.PanelBody;\n\n\nfunction findIframeByContentWindow(iframes, contentWindow) {\n    var foundIframe = void 0;\n    for (var i = 0; i < iframes.length && !foundIframe; i++) {\n        var iframe = iframes[i];\n        if (iframe.contentWindow === contentWindow) {\n            foundIframe = iframe;\n        }\n    }\n    return foundIframe;\n}\n\nfunction sortObject(obj) {\n    return Object.keys(obj).sort().reduce(function (acc, key) {\n        if (Array.isArray(obj[key])) {\n            acc[key] = obj[key].map(sortObjectKeys);\n        }\n        if (_typeof(obj[key]) === 'object') {\n            acc[key] = sortObjectKeys(obj[key]);\n        } else {\n            acc[key] = obj[key];\n        }\n        return acc;\n    }, {});\n}\n\nfunction updateIframe(id, query) {\n    // block options interaction\n    var clientId = id.split(\"div#block-\")[1],\n        blockAttrs = wp.data.select('core/block-editor').getBlockAttributes(clientId),\n        url = blockAttrs.url,\n        iframely_key = '&iframely=';\n\n    // Parse url and make sure we are replacing an url query string properly\n    if (url.indexOf('iframely=') > 0) {\n        var durl = url.split('iframely=')[0];\n        url = durl.substr(0, durl.length - 1);\n    }\n    if (url.indexOf('?') === -1) {\n        iframely_key = '?iframely=';\n    }\n\n    // Ensure sorted options object to make sure\n    // we generating same data each time for same options.\n    query = sortObject(query);\n    //query.timestamp = new Date();\n\n    // Join the url string with iframely params\n    var params = iframely_key + encodeURIComponent(window.btoa(JSON.stringify(query)));\n    var newUrl = url + params;\n\n    // Update the corresponding block and get a preview if required\n    var promise1 = wp.data.dispatch('core/block-editor').updateBlockAttributes([clientId], { url: newUrl });\n    promise1.then(function (value) {\n        // TODO: ???? should we?\n        console.log(value);\n        // expected output: \"foo\"\n    });\n}\n\nif (iframely) {\n    // Failsafe in case of iframely name space not accessible.\n    // E.g. no internet connection\n    iframely.on('options-changed', function (id, formContainer, query) {\n        updateIframe(id, query);\n    });\n}\n\nwindow.addEventListener(\"message\", function (e) {\n    // Listen for messages from iframe proxy script\n    if (iEvent.test(e.data)) {\n        var frames = document.getElementsByTagName(\"iframe\"),\n            iframe = findIframeByContentWindow(frames, e.source);\n        var data = JSON.parse(e.data);\n        $(iframe).data(data);\n    }\n}, false);\n\nvar IframelyOptions = function (_React$Component) {\n    _inherits(IframelyOptions, _React$Component);\n\n    function IframelyOptions() {\n        _classCallCheck(this, IframelyOptions);\n\n        return _possibleConstructorReturn(this, (IframelyOptions.__proto__ || Object.getPrototypeOf(IframelyOptions)).apply(this, arguments));\n    }\n\n    _createClass(IframelyOptions, [{\n        key: \"componentDidMount\",\n        value: function componentDidMount() {\n            iframely.buildOptionsForm(this.props.selector, $('div#ifopts').get(0), this.props.options.data);\n        }\n    }, {\n        key: \"render\",\n        value: function render() {\n            return wp.element.createElement(\n                \"div\",\n                { id: \"ifopts\",\n                    \"data-id\": this.props.clientId,\n                    \"data-opts\": JSON.stringify(this.props.options.data)\n                },\n                this.body\n            );\n        }\n    }]);\n\n    return IframelyOptions;\n}(React.Component);\n\nIframelyOptions.defaultProps = {\n    body: '',\n    clientId: '',\n    selector: '',\n    options: ''\n};\nvar withInspectorControls = createHigherOrderComponent(function (BlockEdit) {\n    return function (props) {\n        var fragment = wp.element.createElement(\n            Fragment,\n            null,\n            wp.element.createElement(BlockEdit, props)\n        );\n        if (props.isSelected === true && (props.name === \"core/embed\" || props.name.startsWith(\"core-embed\"))) {\n            var selector = 'div#block-' + props.clientId;\n            var options = $(selector).find('iframe').data();\n            if (!options || !options.data) {\n                return fragment;\n            }\n            return wp.element.createElement(\n                Fragment,\n                null,\n                wp.element.createElement(BlockEdit, props),\n                wp.element.createElement(\n                    InspectorControls,\n                    null,\n                    wp.element.createElement(\n                        PanelBody,\n                        { title: \"Iframely options\" },\n                        wp.element.createElement(IframelyOptions, { selector: selector, options: options, clientId: props.clientId })\n                    )\n                )\n            );\n        } else {\n            return fragment;\n        }\n    };\n}, \"withInspectorControl\");\n\nwp.hooks.addFilter('editor.BlockEdit', 'iframely/with-inspector-controls', withInspectorControls);\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/OTU1MiJdLCJuYW1lcyI6WyJfXyIsIndwIiwiaTE4biIsImNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50IiwiY29tcG9zZSIsIkZyYWdtZW50IiwiZWxlbWVudCIsIkluc3BlY3RvckNvbnRyb2xzIiwiYmxvY2tFZGl0b3IiLCJpRXZlbnQiLCJSZWdFeHAiLCJQYW5lbEJvZHkiLCJjb21wb25lbnRzIiwiZmluZElmcmFtZUJ5Q29udGVudFdpbmRvdyIsImlmcmFtZXMiLCJjb250ZW50V2luZG93IiwiZm91bmRJZnJhbWUiLCJpIiwibGVuZ3RoIiwiaWZyYW1lIiwic29ydE9iamVjdCIsIm9iaiIsIk9iamVjdCIsImtleXMiLCJzb3J0IiwicmVkdWNlIiwiYWNjIiwia2V5IiwiQXJyYXkiLCJpc0FycmF5IiwibWFwIiwic29ydE9iamVjdEtleXMiLCJ1cGRhdGVJZnJhbWUiLCJpZCIsInF1ZXJ5IiwiY2xpZW50SWQiLCJzcGxpdCIsImJsb2NrQXR0cnMiLCJkYXRhIiwic2VsZWN0IiwiZ2V0QmxvY2tBdHRyaWJ1dGVzIiwidXJsIiwiaWZyYW1lbHlfa2V5IiwiaW5kZXhPZiIsImR1cmwiLCJzdWJzdHIiLCJwYXJhbXMiLCJlbmNvZGVVUklDb21wb25lbnQiLCJ3aW5kb3ciLCJidG9hIiwiSlNPTiIsInN0cmluZ2lmeSIsIm5ld1VybCIsInByb21pc2UxIiwiZGlzcGF0Y2giLCJ1cGRhdGVCbG9ja0F0dHJpYnV0ZXMiLCJ0aGVuIiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwiaWZyYW1lbHkiLCJvbiIsImZvcm1Db250YWluZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRlc3QiLCJmcmFtZXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic291cmNlIiwicGFyc2UiLCIkIiwiSWZyYW1lbHlPcHRpb25zIiwiYnVpbGRPcHRpb25zRm9ybSIsInByb3BzIiwic2VsZWN0b3IiLCJnZXQiLCJvcHRpb25zIiwiYm9keSIsIlJlYWN0IiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwid2l0aEluc3BlY3RvckNvbnRyb2xzIiwiQmxvY2tFZGl0IiwiZnJhZ21lbnQiLCJpc1NlbGVjdGVkIiwibmFtZSIsInN0YXJ0c1dpdGgiLCJmaW5kIiwiaG9va3MiLCJhZGRGaWx0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7O0lBR1FBLEUsR0FBT0MsR0FBR0MsSSxDQUFWRixFO0lBQ0FHLDBCLEdBQStCRixHQUFHRyxPLENBQWxDRCwwQjtJQUNBRSxRLEdBQWFKLEdBQUdLLE8sQ0FBaEJELFE7SUFDQUUsaUIsR0FBc0JOLEdBQUdPLFcsQ0FBekJELGlCOztBQUNSLElBQU1FLFNBQVMsSUFBSUMsTUFBSixDQUFXLHlCQUFYLENBQWY7SUFDUUMsUyxHQUFjVixHQUFHVyxVLENBQWpCRCxTOzs7QUFFUixTQUFTRSx5QkFBVCxDQUFtQ0MsT0FBbkMsRUFBNENDLGFBQTVDLEVBQTJEO0FBQ3ZELFFBQUlDLG9CQUFKO0FBQ0EsU0FBSSxJQUFJQyxJQUFJLENBQVosRUFBZUEsSUFBSUgsUUFBUUksTUFBWixJQUFzQixDQUFDRixXQUF0QyxFQUFtREMsR0FBbkQsRUFBd0Q7QUFDcEQsWUFBSUUsU0FBU0wsUUFBUUcsQ0FBUixDQUFiO0FBQ0EsWUFBSUUsT0FBT0osYUFBUCxLQUF5QkEsYUFBN0IsRUFBNEM7QUFDeENDLDBCQUFjRyxNQUFkO0FBQ0g7QUFDSjtBQUNELFdBQU9ILFdBQVA7QUFDSDs7QUFFRCxTQUFTSSxVQUFULENBQW9CQyxHQUFwQixFQUF3QjtBQUNwQixXQUFPQyxPQUFPQyxJQUFQLENBQVlGLEdBQVosRUFBaUJHLElBQWpCLEdBQXdCQyxNQUF4QixDQUErQixVQUFDQyxHQUFELEVBQUtDLEdBQUwsRUFBVztBQUM3QyxZQUFJQyxNQUFNQyxPQUFOLENBQWNSLElBQUlNLEdBQUosQ0FBZCxDQUFKLEVBQTRCO0FBQ3hCRCxnQkFBSUMsR0FBSixJQUFTTixJQUFJTSxHQUFKLEVBQVNHLEdB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LFVBQVdDLFFBQTVCLEVBQXVDLFNBQVVFLE9BQWpELEVBQTJELFVBQVdILE1BQU12QyxRQUE1RTtBQURKO0FBRFI7QUFGSixhQURKO0FBVUgsU0FoQkQsTUFnQk87QUFDSCxtQkFBT2lELFFBQVA7QUFDSDtBQUNKLEtBckJEO0FBc0JILENBdkI4QixFQXVCNUIsc0JBdkI0QixDQUEvQjs7QUF5QkFuRixHQUFHd0YsS0FBSCxDQUFTQyxTQUFULENBQW9CLGtCQUFwQixFQUF3QyxrQ0FBeEMsRUFBNEVSLHFCQUE1RSIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBJcmFtZWx5IG9lbWJlZCBzY3JpcHRzXG4gKi9cbmNvbnN0IHsgX18gfSA9IHdwLmkxOG47XG5jb25zdCB7IGNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50IH0gPSB3cC5jb21wb3NlO1xuY29uc3QgeyBGcmFnbWVudCB9ID0gd3AuZWxlbWVudDtcbmNvbnN0IHsgSW5zcGVjdG9yQ29udHJvbHMgfSA9IHdwLmJsb2NrRWRpdG9yO1xuY29uc3QgaUV2ZW50ID0gbmV3IFJlZ0V4cChcInNldElmcmFtZWx5RW1iZWRPcHRpb25zXCIpO1xuY29uc3QgeyBQYW5lbEJvZHkgfSA9IHdwLmNvbXBvbmVudHM7XG5cbmZ1bmN0aW9uIGZpbmRJZnJhbWVCeUNvbnRlbnRXaW5kb3coaWZyYW1lcywgY29udGVudFdpbmRvdykge1xuICAgIGxldCBmb3VuZElmcmFtZTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgaWZyYW1lcy5sZW5ndGggJiYgIWZvdW5kSWZyYW1lOyBpKyspIHtcbiAgICAgICAgbGV0IGlmcmFtZSA9IGlmcmFtZXNbaV07XG4gICAgICAgIGlmIChpZnJhbWUuY29udGVudFdpbmRvdyA9PT0gY29udGVudFdpbmRvdykge1xuICAgICAgICAgICAgZm91bmRJZnJhbWUgPSBpZnJhbWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kSWZyYW1lO1xufVxuXG5mdW5jdGlvbiBzb3J0T2JqZWN0KG9iail7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikuc29ydCgpLnJlZHVjZSgoYWNjLGtleSk9PntcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqW2tleV0pKXtcbiAgICAgICAgICAgIGFjY1trZXldPW9ialtrZXldLm1hcChzb3J0T2JqZWN0S2V5cyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBvYmpba2V5XSA9PT0gJ29iamVjdCcpe1xuICAgICAgICAgICAgYWNjW2tleV09c29ydE9iamVjdEtleXMob2JqW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBhY2Nba2V5XT1vYmpba2V5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0se30pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVJZnJhbWUoaWQsIHF1ZXJ5KSB7XG4gICAgLy8gYmxvY2sgb3B0aW9ucyBpbnRlcmFjdGlvblxuICAgIGxldCBjbGllbnRJZCA9IGlkLnNwbGl0KFwiZGl2I2Jsb2NrLVwiKVsxXSxcbiAgICAgICAgYmxvY2tBdHRycyA9IHdwLmRhdGEuc2VsZWN0KCdjb3JlL2Jsb2NrLWVkaXRvcicpLmdldEJsb2NrQXR0cmlidXRlcyhjbGllbnRJZCksXG4gICAgICAgIHVybCA9IGJsb2NrQXR0cnMudXJsLFxuICAgICAgICBpZnJhbWVseV9rZXkgPSAnJmlmcmFtZWx5PSc7XG5cbiAgICAvLyBQYXJzZSB1cmwgYW5kIG1ha2Ugc3VyZSB3ZSBhcmUgcmVwbGFjaW5nIGFuIHVybCBxdWVyeSBzdHJpbmcgcHJvcGVybHlcbiAgICBpZih1cmwuaW5kZXhPZignaWZyYW1lbHk9JykgPiAwKSB7XG4gICAgICAgIGxldCBkdXJsID0gdXJsLnNwbGl0KCdpZnJhbWVseT0nKVswXTtcbiAgICAgICAgdXJsID0gZHVybC5zdWJzdHIoMCwgZHVybC5sZW5ndGgtMSk7XG4gICAgfVxuICAgIGlmKHVybC5pbmRleE9mKCc/JykgPT09IC0xKSB7XG4gICAgICAgIGlmcmFtZWx5X2tleSA9ICc/aWZyYW1lbHk9JztcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgc29ydGVkIG9wdGlvbnMgb2JqZWN0IHRvIG1ha2Ugc3VyZVxuICAgIC8vIHdlIGdlbmVyYXRpbmcgc2FtZSBkYXRhIGVhY2ggdGltZSBmb3Igc2FtZSBvcHRpb25zLlxuICAgIHF1ZXJ5ID0gc29ydE9iamVjdChxdWVyeSk7XG4gICAgLy9xdWVyeS50aW1lc3RhbXAgPSBuZXcgRGF0ZSgpO1xuXG4gICAgLy8gSm9pbiB0aGUgdXJsIHN0cmluZyB3aXRoIGlmcmFtZWx5IHBhcmFtc1xuICAgIGxldCBwYXJhbXMgPSBpZnJhbWVseV9rZXkgKyBlbmNvZGVVUklDb21wb25lbnQod2luZG93LmJ0b2EoSlNPTi5zdHJpbmdpZnkocXVlcnkpKSk7XG4gICAgbGV0IG5ld1VybCA9IHVybCArIHBhcmFtcztcblxuICAgIC8vIFVwZGF0ZSB0aGUgY29ycmVzcG9uZGluZyBibG9jayBhbmQgZ2V0IGEgcHJldmlldyBpZiByZXF1aXJlZFxuICAgIGxldCBwcm9taXNlMSA9IHdwLmRhdGEuZGlzcGF0Y2goJ2NvcmUvYmxvY2stZWRpdG9yJykudXBkYXRlQmxvY2tBdHRyaWJ1dGVzKFtjbGllbnRJZF0sIHsgdXJsOiBuZXdVcmwgfSk7XG4gICAgcHJvbWlzZTEudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAvLyBUT0RPOiA/Pz8/IHNob3VsZCB3ZT9cbiAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgICAvLyBleHBlY3RlZCBvdXRwdXQ6IFwiZm9vXCJcbiAgICB9KTtcbn1cblxuaWYgKGlmcmFtZWx5KSB7XG4gICAgLy8gRmFpbHNhZmUgaW4gY2FzZSBvZiBpZnJhbWVseSBuYW1lIHNwYWNlIG5vdCBhY2Nlc3NpYmxlLlxuICAgIC8vIEUuZy4gbm8gaW50ZXJuZXQgY29ubmVjdGlvblxuICAgIGlmcmFtZWx5Lm9uKCdvcHRpb25zLWNoYW5nZWQnLCBmdW5jdGlvbihpZCwgZm9ybUNvbnRhaW5lciwgcXVlcnkpIHtcbiAgICAgICAgdXBkYXRlSWZyYW1lKGlkLCBxdWVyeSk7XG4gICAgfSk7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLGZ1bmN0aW9uKGUpe1xuICAgIC8vIExpc3RlbiBmb3IgbWVzc2FnZXMgZnJvbSBpZnJhbWUgcHJveHkgc2NyaXB0XG4gICAgaWYoaUV2ZW50LnRlc3QoZS5kYXRhKSkge1xuICAgICAgICBsZXQgZnJhbWVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpZnJhbWVcIiksXG4gICAgICAgICAgICBpZnJhbWUgPSBmaW5kSWZyYW1lQnlDb250ZW50V2luZG93KGZyYW1lcywgZS5zb3VyY2UpO1xuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcbiAgICAgICAgJChpZnJhbWUpLmRhdGEoZGF0YSk7XG4gICAgfVxufSxmYWxzZSk7XG5cblxuY2xhc3MgSWZyYW1lbHlPcHRpb25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZnJhbWVseS5idWlsZE9wdGlvbnNGb3JtKHRoaXMucHJvcHMuc2VsZWN0b3IsICQoJ2RpdiNpZm9wdHMnKS5nZXQoMCksIHRoaXMucHJvcHMub3B0aW9ucy5kYXRhKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGlkPVwiaWZvcHRzXCJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS1pZD17IHRoaXMucHJvcHMuY2xpZW50SWQgfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLW9wdHM9e0pTT04uc3RyaW5naWZ5KHRoaXMucHJvcHMub3B0aW9ucy5kYXRhKX1cbiAgICAgICAgPnsgdGhpcy5ib2R5IH08L2Rpdj47XG4gICAgfVxufVxuXG5JZnJhbWVseU9wdGlvbnMuZGVmYXVsdFByb3BzID0ge1xuICAgIGJvZHk6ICcnLFxuICAgIGNsaWVudElkOiAnJyxcbiAgICBzZWxlY3RvcjogJycsXG4gICAgb3B0aW9uczogJycsXG59O1xuY29uc3Qgd2l0aEluc3BlY3RvckNvbnRyb2xzID0gIGNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50KCAoIEJsb2NrRWRpdCApID0+IHtcbiAgICByZXR1cm4gKCBwcm9wcyApID0+IHtcbiAgICAgICAgbGV0IGZyYWdtZW50ID0gKDxGcmFnbWVudD48QmxvY2tFZGl0IHsgLi4ucHJvcHMgfSAvPjwvRnJhZ21lbnQ+KTtcbiAgICAgICAgaWYgKHByb3BzLmlzU2VsZWN0ZWQ9PT10cnVlICYmIChwcm9wcy5uYW1lID09PSBcImNvcmUvZW1iZWRcIiB8fCBwcm9wcy5uYW1lLnN0YXJ0c1dpdGgoXCJjb3JlLWVtYmVkXCIpKSkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdG9yID0gJ2RpdiNibG9jay0nICsgcHJvcHMuY2xpZW50SWQ7XG4gICAgICAgICAgICBsZXQgb3B0aW9ucyA9ICQoc2VsZWN0b3IpLmZpbmQoJ2lmcmFtZScpLmRhdGEoKTtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyYWdtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8RnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgICAgIDxCbG9ja0VkaXQgeyAuLi5wcm9wcyB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxJbnNwZWN0b3JDb250cm9scz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGFuZWxCb2R5IHRpdGxlPVwiSWZyYW1lbHkgb3B0aW9uc1wiID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPElmcmFtZWx5T3B0aW9ucyBzZWxlY3Rvcj17IHNlbGVjdG9yIH0gb3B0aW9ucz17IG9wdGlvbnMgfSBjbGllbnRJZD17IHByb3BzLmNsaWVudElkIH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1BhbmVsQm9keT5cbiAgICAgICAgICAgICAgICAgICAgPC9JbnNwZWN0b3JDb250cm9scz5cbiAgICAgICAgICAgICAgICA8L0ZyYWdtZW50PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmcmFnbWVudDtcbiAgICAgICAgfVxuICAgIH07XG59LCBcIndpdGhJbnNwZWN0b3JDb250cm9sXCIgKTtcblxud3AuaG9va3MuYWRkRmlsdGVyKCAnZWRpdG9yLkJsb2NrRWRpdCcsICdpZnJhbWVseS93aXRoLWluc3BlY3Rvci1jb250cm9scycsIHdpdGhJbnNwZWN0b3JDb250cm9scyApO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n");

        /***/ })
    /******/ ]);