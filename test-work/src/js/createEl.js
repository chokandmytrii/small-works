			function createElem(options) {

				if (!options || !options.tagName) return;
				const tag = document.createElement(options.tagName);

				addClass(tag, options.classList);

				addAtributes(tag, options.atributes);

				addContent(tag, options.content);

				if (options.events) addEvents(tag, options.events)

				return tag;
			}

			function addEvents(node, events) {
				if (!node || !events) return;

				node.addEventListener(events.eventName, events.handler);
			}

			function addContent(node, content) {
				if (!content) return;

				if (typeof content === 'string') {
					node.textContent = content;
				} else if (content.nodeType === 1) {
					node.append(content);
				} else if (Array.isArray(content)) {
					content.forEach(element => {
						addContent(node, element);
					});
				}
			}

			function addClass(node, classList) {
				if (!node || !classList) return;

				node.classList.add(...classList.split(' '));
			}


			function addAtributes(node, options) {
				if (!options || !node) return;

				for (let key in options) {
					node.setAttribute(key, options[key]);
				}
			}

			export default createElem
