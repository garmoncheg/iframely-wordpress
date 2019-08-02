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

eval("var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * Iramely oembed scripts\n */\nvar __ = wp.i18n.__;\nvar createHigherOrderComponent = wp.compose.createHigherOrderComponent;\nvar Fragment = wp.element.Fragment;\nvar InspectorControls = wp.blockEditor.InspectorControls;\nvar PanelBody = wp.components.PanelBody;\n\nvar iEvent = new RegExp(\"setIframelyEmbedOptions\");\n\nfunction sleep(milliseconds) {\n    var start = new Date().getTime();\n    for (var i = 0; i < 1e7; i++) {\n        if (new Date().getTime() - start > milliseconds) {\n            break;\n        }\n    }\n}\n\nfunction findIframeByContentWindow(iframes, contentWindow) {\n    var foundIframe = void 0;\n    for (var i = 0; i < iframes.length && !foundIframe; i++) {\n        var iframe = iframes[i];\n        if (iframe.contentWindow === contentWindow) {\n            foundIframe = iframe;\n        }\n    }\n    return foundIframe;\n}\n\niframely.on('options-changed', function (id, formContainer, query) {\n    // block options interaction\n    var clientId = id.split(\"div#block-\")[1],\n        blockAttrs = wp.data.select('core/block-editor').getBlockAttributes(clientId),\n        url = blockAttrs.url,\n        iframely_key = '&iframely=';\n\n    // Parse url and make sure we are replacing an url query string properly\n    if (url.indexOf('iframely=') > 0) {\n        var durl = url.split('iframely=')[0];\n        url = durl.substr(0, durl.length - 1);\n    }\n    if (url.indexOf('?') === -1) {\n        iframely_key = '?iframely=';\n    }\n\n    // Join the url string with iframely params\n    var params = iframely_key + encodeURIComponent(window.btoa(JSON.stringify(query)));\n    var newUrl = url + params;\n    console.log('New url:', newUrl);\n    console.log('Old url:', blockAttrs.url);\n    wp.data.dispatch('core/block-editor').updateBlockAttributes([clientId], { url: newUrl });\n});\n\nfunction initListener() {\n    window.addEventListener(\"message\", function (e) {\n        var frames = document.getElementsByTagName(\"iframe\");\n        if (iEvent.test(e.data)) {\n            console.log('Listener executes!');\n            var iframe = findIframeByContentWindow(frames, e.source);\n            $(iframe).data(JSON.parse(e.data));\n        }\n    }, false);\n}\ninitListener();\n\nvar IframelyOptions = function (_React$Component) {\n    _inherits(IframelyOptions, _React$Component);\n\n    function IframelyOptions() {\n        _classCallCheck(this, IframelyOptions);\n\n        return _possibleConstructorReturn(this, (IframelyOptions.__proto__ || Object.getPrototypeOf(IframelyOptions)).apply(this, arguments));\n    }\n\n    _createClass(IframelyOptions, [{\n        key: \"renderForm\",\n        value: function renderForm(clientId) {\n            // Rendering form for options in the Inspector\n            var selector = 'div#block-' + clientId;\n            var options = $(selector).find('iframe').data();\n            if (options) {\n                console.log('Options:');\n                console.log(options);\n                iframely.buildOptionsForm(selector, $('div#ifopts').get(0), options.data);\n            }\n        }\n    }, {\n        key: \"componentDidMount\",\n        value: function componentDidMount() {\n            this.renderForm(this.props.data);\n        }\n    }, {\n        key: \"componentDidUpdate\",\n        value: function componentDidUpdate() {\n            this.renderForm(this.props.data);\n        }\n    }, {\n        key: \"render\",\n        value: function render() {\n            return wp.element.createElement(\n                \"div\",\n                { id: \"ifopts\", \"data-id\": this.props.data },\n                this.body\n            );\n        }\n    }]);\n\n    return IframelyOptions;\n}(React.Component);\n\nIframelyOptions.defaultProps = {\n    body: '',\n    data: ''\n};\n\nvar withInspectorControls = createHigherOrderComponent(function (BlockEdit) {\n    return function (props) {\n        if (props.isSelected === true && (props.name === \"core/embed\" || props.name.startsWith(\"core-embed\"))) {\n            return wp.element.createElement(\n                Fragment,\n                null,\n                wp.element.createElement(BlockEdit, props),\n                wp.element.createElement(\n                    InspectorControls,\n                    null,\n                    wp.element.createElement(\n                        PanelBody,\n                        null,\n                        wp.element.createElement(IframelyOptions, { data: props.clientId })\n                    )\n                )\n            );\n        } else {\n            return wp.element.createElement(\n                Fragment,\n                null,\n                wp.element.createElement(BlockEdit, props)\n            );\n        }\n    };\n}, \"withInspectorControl\");\n\nwp.hooks.addFilter('editor.BlockEdit', 'iframely/with-inspector-controls', withInspectorControls);\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/OTU1MiJdLCJuYW1lcyI6WyJfXyIsIndwIiwiaTE4biIsImNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50IiwiY29tcG9zZSIsIkZyYWdtZW50IiwiZWxlbWVudCIsIkluc3BlY3RvckNvbnRyb2xzIiwiYmxvY2tFZGl0b3IiLCJQYW5lbEJvZHkiLCJjb21wb25lbnRzIiwiaUV2ZW50IiwiUmVnRXhwIiwic2xlZXAiLCJtaWxsaXNlY29uZHMiLCJzdGFydCIsIkRhdGUiLCJnZXRUaW1lIiwiaSIsImZpbmRJZnJhbWVCeUNvbnRlbnRXaW5kb3ciLCJpZnJhbWVzIiwiY29udGVudFdpbmRvdyIsImZvdW5kSWZyYW1lIiwibGVuZ3RoIiwiaWZyYW1lIiwiaWZyYW1lbHkiLCJvbiIsImlkIiwiZm9ybUNvbnRhaW5lciIsInF1ZXJ5IiwiY2xpZW50SWQiLCJzcGxpdCIsImJsb2NrQXR0cnMiLCJkYXRhIiwic2VsZWN0IiwiZ2V0QmxvY2tBdHRyaWJ1dGVzIiwidXJsIiwiaWZyYW1lbHlfa2V5IiwiaW5kZXhPZiIsImR1cmwiLCJzdWJzdHIiLCJwYXJhbXMiLCJlbmNvZGVVUklDb21wb25lbnQiLCJ3aW5kb3ciLCJidG9hIiwiSlNPTiIsInN0cmluZ2lmeSIsIm5ld1VybCIsImNvbnNvbGUiLCJsb2ciLCJkaXNwYXRjaCIsInVwZGF0ZUJsb2NrQXR0cmlidXRlcyIsImluaXRMaXN0ZW5lciIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiZnJhbWVzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInRlc3QiLCJzb3VyY2UiLCIkIiwicGFyc2UiLCJJZnJhbWVseU9wdGlvbnMiLCJzZWxlY3RvciIsIm9wdGlvbnMiLCJmaW5kIiwiYnVpbGRPcHRpb25zRm9ybSIsImdldCIsInJlbmRlckZvcm0iLCJwcm9wcyIsImJvZHkiLCJSZWFjdCIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsIndpdGhJbnNwZWN0b3JDb250cm9scyIsIkJsb2NrRWRpdCIsImlzU2VsZWN0ZWQiLCJuYW1lIiwic3RhcnRzV2l0aCIsImhvb2tzIiwiYWRkRmlsdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7SUFHUUEsRSxHQUFPQyxHQUFHQyxJLENBQVZGLEU7SUFDQUcsMEIsR0FBK0JGLEdBQUdHLE8sQ0FBbENELDBCO0lBQ0FFLFEsR0FBYUosR0FBR0ssTyxDQUFoQkQsUTtJQUNBRSxpQixHQUFzQk4sR0FBR08sVyxDQUF6QkQsaUI7SUFDQUUsUyxHQUFjUixHQUFHUyxVLENBQWpCRCxTOztBQUNSLElBQU1FLFNBQVMsSUFBSUMsTUFBSixDQUFXLHlCQUFYLENBQWY7O0FBRUEsU0FBU0MsS0FBVCxDQUFlQyxZQUFmLEVBQTZCO0FBQ3pCLFFBQUlDLFFBQVEsSUFBSUMsSUFBSixHQUFXQyxPQUFYLEVBQVo7QUFDQSxTQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSSxHQUFwQixFQUF5QkEsR0FBekIsRUFBOEI7QUFDMUIsWUFBSyxJQUFJRixJQUFKLEdBQVdDLE9BQVgsS0FBdUJGLEtBQXhCLEdBQWlDRCxZQUFyQyxFQUFrRDtBQUM5QztBQUNIO0FBQ0o7QUFDSjs7QUFFRCxTQUFTSyx5QkFBVCxDQUFtQ0MsT0FBbkMsRUFBNENDLGFBQTVDLEVBQTJEO0FBQ3ZELFFBQUlDLG9CQUFKO0FBQ0EsU0FBSSxJQUFJSixJQUFJLENBQVosRUFBZUEsSUFBSUUsUUFBUUcsTUFBWixJQUFzQixDQUFDRCxXQUF0QyxFQUFtREosR0FBbkQsRUFBd0Q7QUFDcEQsWUFBSU0sU0FBU0osUUFBUUYsQ0FBUixDQUFiO0FBQ0EsWUFBSU0sT0FBT0gsYUFBUCxLQUF5QkEsYUFBN0IsRUFBNEM7QUFDeENDLDBCQUFjRSxNQUFkO0FBQ0g7QUFDSjtBQUNELFdBQU9GLFdBQVA7QUFDSDs7QUFFREcsU0FBU0MsRUFBVCxDQUFZLGlCQUFaLEVBQStCLFVBQVNDLEVBQVQsRUFBYUMsYUFBYixFQUE0QkMsS0FBNUIsRUFBbUM7QUFDOUQ7QUFD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QyxVQUFNO0FBRnFCLENBQS9COztBQUtBLElBQU15Qyx3QkFBeUJ2RSwyQkFBNEIsVUFBRXdFLFNBQUYsRUFBaUI7QUFDeEUsV0FBTyxVQUFFTixLQUFGLEVBQWE7QUFDaEIsWUFBSUEsTUFBTU8sVUFBTixLQUFtQixJQUFuQixLQUE0QlAsTUFBTVEsSUFBTixLQUFlLFlBQWYsSUFBK0JSLE1BQU1RLElBQU4sQ0FBV0MsVUFBWCxDQUFzQixZQUF0QixDQUEzRCxDQUFKLEVBQXFHO0FBQ2pHLG1CQUNJO0FBQUMsd0JBQUQ7QUFBQTtBQUNJLHlDQUFDLFNBQUQsRUFBZ0JULEtBQWhCLENBREo7QUFFSTtBQUFDLHFDQUFEO0FBQUE7QUFDSTtBQUFDLGlDQUFEO0FBQUE7QUFDSSxpREFBQyxlQUFELElBQWlCLE1BQU9BLE1BQU12QyxRQUE5QjtBQURKO0FBREo7QUFGSixhQURKO0FBVUgsU0FYRCxNQVdPO0FBQ0gsbUJBQVE7QUFBQyx3QkFBRDtBQUFBO0FBQVUseUNBQUMsU0FBRCxFQUFnQnVDLEtBQWhCO0FBQVYsYUFBUjtBQUNIO0FBQ0osS0FmRDtBQWdCSCxDQWpCOEIsRUFpQjVCLHNCQWpCNEIsQ0FBL0I7O0FBbUJBcEUsR0FBRzhFLEtBQUgsQ0FBU0MsU0FBVCxDQUFvQixrQkFBcEIsRUFBd0Msa0NBQXhDLEVBQTRFTixxQkFBNUUiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogSXJhbWVseSBvZW1iZWQgc2NyaXB0c1xuICovXG5jb25zdCB7IF9fIH0gPSB3cC5pMThuO1xuY29uc3QgeyBjcmVhdGVIaWdoZXJPcmRlckNvbXBvbmVudCB9ID0gd3AuY29tcG9zZTtcbmNvbnN0IHsgRnJhZ21lbnQgfSA9IHdwLmVsZW1lbnQ7XG5jb25zdCB7IEluc3BlY3RvckNvbnRyb2xzIH0gPSB3cC5ibG9ja0VkaXRvcjtcbmNvbnN0IHsgUGFuZWxCb2R5IH0gPSB3cC5jb21wb25lbnRzO1xuY29uc3QgaUV2ZW50ID0gbmV3IFJlZ0V4cChcInNldElmcmFtZWx5RW1iZWRPcHRpb25zXCIpO1xuXG5mdW5jdGlvbiBzbGVlcChtaWxsaXNlY29uZHMpIHtcbiAgICB2YXIgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDFlNzsgaSsrKSB7XG4gICAgICAgIGlmICgobmV3IERhdGUoKS5nZXRUaW1lKCkgLSBzdGFydCkgPiBtaWxsaXNlY29uZHMpe1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZpbmRJZnJhbWVCeUNvbnRlbnRXaW5kb3coaWZyYW1lcywgY29udGVudFdpbmRvdykge1xuICAgIGxldCBmb3VuZElmcmFtZTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgaWZyYW1lcy5sZW5ndGggJiYgIWZvdW5kSWZyYW1lOyBpKyspIHtcbiAgICAgICAgbGV0IGlmcmFtZSA9IGlmcmFtZXNbaV07XG4gICAgICAgIGlmIChpZnJhbWUuY29udGVudFdpbmRvdyA9PT0gY29udGVudFdpbmRvdykge1xuICAgICAgICAgICAgZm91bmRJZnJhbWUgPSBpZnJhbWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kSWZyYW1lO1xufVxuXG5pZnJhbWVseS5vbignb3B0aW9ucy1jaGFuZ2VkJywgZnVuY3Rpb24oaWQsIGZvcm1Db250YWluZXIsIHF1ZXJ5KSB7XG4gICAgLy8gYmxvY2sgb3B0aW9ucyBpbnRlcmFjdGlvblxuICAgIGxldCBjbGllbnRJZCA9IGlkLnNwbGl0KFwiZGl2I2Jsb2NrLVwiKVsxXSxcbiAgICAgICAgYmxvY2tBdHRycyA9IHdwLmRhdGEuc2VsZWN0KCdjb3JlL2Jsb2NrLWVkaXRvcicpLmdldEJsb2NrQXR0cmlidXRlcyhjbGllbnRJZCksXG4gICAgICAgIHVybCA9IGJsb2NrQXR0cnMudXJsLFxuICAgICAgICBpZnJhbWVseV9rZXkgPSAnJmlmcmFtZWx5PSc7XG5cbiAgICAvLyBQYXJzZSB1cmwgYW5kIG1ha2Ugc3VyZSB3ZSBhcmUgcmVwbGFjaW5nIGFuIHVybCBxdWVyeSBzdHJpbmcgcHJvcGVybHlcbiAgICBpZih1cmwuaW5kZXhPZignaWZyYW1lbHk9JykgPiAwKSB7XG4gICAgICAgIGxldCBkdXJsID0gdXJsLnNwbGl0KCdpZnJhbWVseT0nKVswXTtcbiAgICAgICAgdXJsID0gZHVybC5zdWJzdHIoMCwgZHVybC5sZW5ndGgtMSk7XG4gICAgfVxuICAgIGlmKHVybC5pbmRleE9mKCc/JykgPT09IC0xKSB7XG4gICAgICAgIGlmcmFtZWx5X2tleSA9ICc/aWZyYW1lbHk9JztcbiAgICB9XG5cbiAgICAvLyBKb2luIHRoZSB1cmwgc3RyaW5nIHdpdGggaWZyYW1lbHkgcGFyYW1zXG4gICAgbGV0IHBhcmFtcyA9IGlmcmFtZWx5X2tleSArIGVuY29kZVVSSUNvbXBvbmVudCh3aW5kb3cuYnRvYShKU09OLnN0cmluZ2lmeShxdWVyeSkpKTtcbiAgICBsZXQgbmV3VXJsID0gdXJsICsgcGFyYW1zO1xuICAgIGNvbnNvbGUubG9nKCdOZXcgdXJsOicsIG5ld1VybCk7XG4gICAgY29uc29sZS5sb2coJ09sZCB1cmw6JywgYmxvY2tBdHRycy51cmwpO1xuICAgIHdwLmRhdGEuZGlzcGF0Y2goJ2NvcmUvYmxvY2stZWRpdG9yJykudXBkYXRlQmxvY2tBdHRyaWJ1dGVzKFtjbGllbnRJZF0sIHsgdXJsOiBuZXdVcmwgfSk7XG5cbn0pO1xuXG5mdW5jdGlvbiBpbml0TGlzdGVuZXIoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsZnVuY3Rpb24oZSl7XG4gICAgICAgIGxldCBmcmFtZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlmcmFtZVwiKTtcbiAgICAgICAgaWYoaUV2ZW50LnRlc3QoZS5kYXRhKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0xpc3RlbmVyIGV4ZWN1dGVzIScpO1xuICAgICAgICAgICAgbGV0IGlmcmFtZSA9IGZpbmRJZnJhbWVCeUNvbnRlbnRXaW5kb3coZnJhbWVzLCBlLnNvdXJjZSk7XG4gICAgICAgICAgICAkKGlmcmFtZSkuZGF0YShKU09OLnBhcnNlKGUuZGF0YSkpO1xuICAgICAgICB9XG4gICAgfSxmYWxzZSk7XG59XG5pbml0TGlzdGVuZXIoKTtcblxuY2xhc3MgSWZyYW1lbHlPcHRpb25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIHJlbmRlckZvcm0oY2xpZW50SWQpIHtcbiAgICAgICAgLy8gUmVuZGVyaW5nIGZvcm0gZm9yIG9wdGlvbnMgaW4gdGhlIEluc3BlY3RvclxuICAgICAgICBsZXQgc2VsZWN0b3IgPSAnZGl2I2Jsb2NrLScgKyBjbGllbnRJZDtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSAkKHNlbGVjdG9yKS5maW5kKCdpZnJhbWUnKS5kYXRhKCk7XG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnT3B0aW9uczonKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG9wdGlvbnMpO1xuICAgICAgICAgICAgaWZyYW1lbHkuYnVpbGRPcHRpb25zRm9ybShzZWxlY3RvciwgJCgnZGl2I2lmb3B0cycpLmdldCgwKSwgb3B0aW9ucy5kYXRhKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyRm9ybSh0aGlzLnByb3BzLmRhdGEpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJGb3JtKHRoaXMucHJvcHMuZGF0YSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBpZD1cImlmb3B0c1wiIGRhdGEtaWQ9eyB0aGlzLnByb3BzLmRhdGEgfT57IHRoaXMuYm9keSB9PC9kaXY+O1xuICAgIH1cblxufVxuXG5JZnJhbWVseU9wdGlvbnMuZGVmYXVsdFByb3BzID0ge1xuICAgIGJvZHk6ICcnLFxuICAgIGRhdGE6ICcnLFxufTtcblxuY29uc3Qgd2l0aEluc3BlY3RvckNvbnRyb2xzID0gIGNyZWF0ZUhpZ2hlck9yZGVyQ29tcG9uZW50KCAoIEJsb2NrRWRpdCApID0+IHtcbiAgICByZXR1cm4gKCBwcm9wcyApID0+IHtcbiAgICAgICAgaWYgKHByb3BzLmlzU2VsZWN0ZWQ9PT10cnVlICYmIChwcm9wcy5uYW1lID09PSBcImNvcmUvZW1iZWRcIiB8fCBwcm9wcy5uYW1lLnN0YXJ0c1dpdGgoXCJjb3JlLWVtYmVkXCIpKSkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8RnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgICAgIDxCbG9ja0VkaXQgeyAuLi5wcm9wcyB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxJbnNwZWN0b3JDb250cm9scz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxQYW5lbEJvZHkgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJZnJhbWVseU9wdGlvbnMgZGF0YT17IHByb3BzLmNsaWVudElkIH0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9QYW5lbEJvZHk+XG4gICAgICAgICAgICAgICAgICAgIDwvSW5zcGVjdG9yQ29udHJvbHM+XG4gICAgICAgICAgICAgICAgPC9GcmFnbWVudD5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gKDxGcmFnbWVudD48QmxvY2tFZGl0IHsgLi4ucHJvcHMgfSAvPjwvRnJhZ21lbnQ+KTtcbiAgICAgICAgfVxuICAgIH07XG59LCBcIndpdGhJbnNwZWN0b3JDb250cm9sXCIgKTtcblxud3AuaG9va3MuYWRkRmlsdGVyKCAnZWRpdG9yLkJsb2NrRWRpdCcsICdpZnJhbWVseS93aXRoLWluc3BlY3Rvci1jb250cm9scycsIHdpdGhJbnNwZWN0b3JDb250cm9scyApO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n");

/***/ })
/******/ ]);