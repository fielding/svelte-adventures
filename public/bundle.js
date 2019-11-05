
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function validate_store(store, name) {
        if (!store || typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, callback) {
        const unsub = store.subscribe(callback);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, fn) {
        return definition[1]
            ? assign({}, assign(ctx.$$scope.ctx, definition[1](fn ? fn(ctx) : {})))
            : ctx.$$scope.ctx;
    }
    function get_slot_changes(definition, ctx, changed, fn) {
        return definition[1]
            ? assign({}, assign(ctx.$$scope.changed || {}, definition[1](fn ? fn(changed) : {})))
            : ctx.$$scope.changed || {};
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function set_store_value(store, ret, value = ret) {
        store.set(value);
        return ret;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function beforeUpdate(fn) {
        get_current_component().$$.before_update.push(fn);
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment) {
            $$.update($$.dirty);
            run_all($$.before_update);
            $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        if (component.$$.fragment) {
            run_all(component.$$.on_destroy);
            component.$$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            component.$$.on_destroy = component.$$.fragment = null;
            component.$$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal, prop_names) {
        const parent_component = current_component;
        set_current_component(component);
        const props = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props: prop_names,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, props, (key, ret, value = ret) => {
                if ($$.ctx && not_equal($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
                return ret;
            })
            : props;
        $$.update();
        ready = true;
        run_all($$.before_update);
        $$.fragment = create_fragment($$.ctx);
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, detail));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const mainScreen = writable('Profile');
    const stackedScreen = writable(null);

    /* src/components/AccountScreen.svelte generated by Svelte v3.12.1 */

    const file = "src/components/AccountScreen.svelte";

    const get_title_slot_changes = () => ({});
    const get_title_slot_context = () => ({});

    function create_fragment(ctx) {
    	var div, t, current;

    	const title_slot_template = ctx.$$slots.title;
    	const title_slot = create_slot(title_slot_template, ctx, get_title_slot_context);

    	const default_slot_template = ctx.$$slots.default;
    	const default_slot = create_slot(default_slot_template, ctx, null);

    	const block = {
    		c: function create() {
    			div = element("div");

    			if (title_slot) title_slot.c();
    			t = space();

    			if (default_slot) default_slot.c();

    			attr_dev(div, "class", "screen svelte-yyfgyk");
    			toggle_class(div, "swipeable", ctx.swipeable);
    			add_location(div, file, 6, 0, 103);
    		},

    		l: function claim(nodes) {
    			if (title_slot) title_slot.l(div_nodes);

    			if (default_slot) default_slot.l(div_nodes);
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (title_slot) {
    				title_slot.m(div, null);
    			}

    			append_dev(div, t);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (title_slot && title_slot.p && changed.$$scope) {
    				title_slot.p(
    					get_slot_changes(title_slot_template, ctx, changed, get_title_slot_changes),
    					get_slot_context(title_slot_template, ctx, get_title_slot_context)
    				);
    			}

    			if (default_slot && default_slot.p && changed.$$scope) {
    				default_slot.p(
    					get_slot_changes(default_slot_template, ctx, changed, null),
    					get_slot_context(default_slot_template, ctx, null)
    				);
    			}

    			if (changed.swipeable) {
    				toggle_class(div, "swipeable", ctx.swipeable);
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(title_slot, local);
    			transition_in(default_slot, local);
    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(title_slot, local);
    			transition_out(default_slot, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}

    			if (title_slot) title_slot.d(detaching);

    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { swipeable = false } = $$props;

    let position = swipeable ? 'relative' : 'absolute';

    	const writable_props = ['swipeable'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<AccountScreen> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;

    	$$self.$set = $$props => {
    		if ('swipeable' in $$props) $$invalidate('swipeable', swipeable = $$props.swipeable);
    		if ('$$scope' in $$props) $$invalidate('$$scope', $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => {
    		return { swipeable, position };
    	};

    	$$self.$inject_state = $$props => {
    		if ('swipeable' in $$props) $$invalidate('swipeable', swipeable = $$props.swipeable);
    		if ('position' in $$props) position = $$props.position;
    	};

    	return { swipeable, $$slots, $$scope };
    }

    class AccountScreen extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, ["swipeable"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "AccountScreen", options, id: create_fragment.name });
    	}

    	get swipeable() {
    		throw new Error("<AccountScreen>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set swipeable(value) {
    		throw new Error("<AccountScreen>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Balance.svelte generated by Svelte v3.12.1 */

    const file$1 = "src/components/Balance.svelte";

    function create_fragment$1(ctx) {
    	var div, i, t, span;

    	const block = {
    		c: function create() {
    			div = element("div");
    			i = element("i");
    			t = text("0");
    			span = element("span");
    			span.textContent = ".000";
    			attr_dev(i, "class", "svelte-a0tikg");
    			add_location(i, file$1, 1, 1, 23);
    			attr_dev(span, "class", "svelte-a0tikg");
    			add_location(span, file$1, 1, 9, 31);
    			attr_dev(div, "class", "balance svelte-a0tikg");
    			add_location(div, file$1, 0, 0, 0);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, i);
    			append_dev(div, t);
    			append_dev(div, span);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$1.name, type: "component", source: "", ctx });
    	return block;
    }

    class Balance extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$1, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Balance", options, id: create_fragment$1.name });
    	}
    }

    /* src/components/PromoCard.svelte generated by Svelte v3.12.1 */

    const file$2 = "src/components/PromoCard.svelte";

    function create_fragment$2(ctx) {
    	var div, h2, t0, t1, p, t2, t3, span, t4_value = ctx.index + 1 + "", t4, t5, t6;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			t0 = text(ctx.title);
    			t1 = space();
    			p = element("p");
    			t2 = text(ctx.body);
    			t3 = space();
    			span = element("span");
    			t4 = text(t4_value);
    			t5 = text("/");
    			t6 = text(ctx.total);
    			attr_dev(h2, "class", "svelte-fkdykk");
    			add_location(h2, file$2, 5, 1, 78);
    			attr_dev(p, "class", "svelte-fkdykk");
    			add_location(p, file$2, 6, 1, 96);
    			attr_dev(span, "class", "index svelte-fkdykk");
    			add_location(span, file$2, 7, 1, 111);
    			attr_dev(div, "class", "card svelte-fkdykk");
    			add_location(div, file$2, 4, 0, 58);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h2);
    			append_dev(h2, t0);
    			append_dev(div, t1);
    			append_dev(div, p);
    			append_dev(p, t2);
    			append_dev(div, t3);
    			append_dev(div, span);
    			append_dev(span, t4);
    			append_dev(span, t5);
    			append_dev(span, t6);
    		},

    		p: function update(changed, ctx) {
    			if (changed.title) {
    				set_data_dev(t0, ctx.title);
    			}

    			if (changed.body) {
    				set_data_dev(t2, ctx.body);
    			}

    			if ((changed.index) && t4_value !== (t4_value = ctx.index + 1 + "")) {
    				set_data_dev(t4, t4_value);
    			}

    			if (changed.total) {
    				set_data_dev(t6, ctx.total);
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$2.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { title, body, index, total } = $$props;

    	const writable_props = ['title', 'body', 'index', 'total'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<PromoCard> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('title' in $$props) $$invalidate('title', title = $$props.title);
    		if ('body' in $$props) $$invalidate('body', body = $$props.body);
    		if ('index' in $$props) $$invalidate('index', index = $$props.index);
    		if ('total' in $$props) $$invalidate('total', total = $$props.total);
    	};

    	$$self.$capture_state = () => {
    		return { title, body, index, total };
    	};

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate('title', title = $$props.title);
    		if ('body' in $$props) $$invalidate('body', body = $$props.body);
    		if ('index' in $$props) $$invalidate('index', index = $$props.index);
    		if ('total' in $$props) $$invalidate('total', total = $$props.total);
    	};

    	return { title, body, index, total };
    }

    class PromoCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$2, safe_not_equal, ["title", "body", "index", "total"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "PromoCard", options, id: create_fragment$2.name });

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.title === undefined && !('title' in props)) {
    			console.warn("<PromoCard> was created without expected prop 'title'");
    		}
    		if (ctx.body === undefined && !('body' in props)) {
    			console.warn("<PromoCard> was created without expected prop 'body'");
    		}
    		if (ctx.index === undefined && !('index' in props)) {
    			console.warn("<PromoCard> was created without expected prop 'index'");
    		}
    		if (ctx.total === undefined && !('total' in props)) {
    			console.warn("<PromoCard> was created without expected prop 'total'");
    		}
    	}

    	get title() {
    		throw new Error("<PromoCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<PromoCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get body() {
    		throw new Error("<PromoCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set body(value) {
    		throw new Error("<PromoCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get index() {
    		throw new Error("<PromoCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set index(value) {
    		throw new Error("<PromoCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get total() {
    		throw new Error("<PromoCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set total(value) {
    		throw new Error("<PromoCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/PromoCards.svelte generated by Svelte v3.12.1 */

    const file$3 = "src/components/PromoCards.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.name = list[i].name;
    	child_ctx.title = list[i].title;
    	child_ctx.body = list[i].body;
    	child_ctx.screen = list[i].screen;
    	child_ctx.index = i;
    	return child_ctx;
    }

    // (54:1) {#each promoInfo as {name, title, body, screen}
    function create_each_block(ctx) {
    	var current;

    	var promocard = new PromoCard({
    		props: {
    		title: ctx.title,
    		body: ctx.body,
    		index: ctx.index,
    		total: ctx.total
    	},
    		$$inline: true
    	});

    	const block = {
    		c: function create() {
    			promocard.$$.fragment.c();
    		},

    		m: function mount(target, anchor) {
    			mount_component(promocard, target, anchor);
    			current = true;
    		},

    		p: noop,

    		i: function intro(local) {
    			if (current) return;
    			transition_in(promocard.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(promocard.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(promocard, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_each_block.name, type: "each", source: "(54:1) {#each promoInfo as {name, title, body, screen}", ctx });
    	return block;
    }

    function create_fragment$3(ctx) {
    	var div, current;

    	let each_value = ctx.promoInfo;

    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}
    			attr_dev(div, "class", "promos svelte-vxl8z");
    			add_location(div, file$3, 52, 0, 1102);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			ctx.div_binding(div);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (changed.promoInfo || changed.total) {
    				each_value = ctx.promoInfo;

    				let i;
    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();
    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}
    				check_outros();
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},

    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}

    			destroy_each(each_blocks, detaching);

    			ctx.div_binding(null);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$3.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	
    	
    	const promoInfo = [
    		{
    			name: 'promo__friend_bonus',
    			title: '2x Friend Bonus',
    			body: 'Get a 5x bonus every time you and your friend watch the same Vidy',
    			screen: 'FriendBonus',
    		},
    		{
    			name: 'promo__lottery',
    			title: 'Win Lottery',
    			body: 'Theres a hidden jackpot under every 50 Vidys you hold. Good luck!',
    			screen: 'Lottery',
    		},
    		{
    			name: 'promo__onboarding',
    			title: 'Earn 50 VidyCoin',
    			body: 'Finish onboarding and earn 50 VidyCoin!',
    			screen: 'Onboarding1',
    		},
    		{
    			name: 'rewards',
    			title: 'Unlock Trophies',
    			body: 'Complete milestones and start earning VidyCoin!',
    			screen: 'Rewards',
    		},
    ];
    	
    const total = promoInfo.length;

    let cards;
    	
    onMount(() => {
    	const lastCardClone = cards.lastChild.cloneNode(true);
    	cards.appendChild(cards.firstChild.cloneNode(true));
    	cards.insertBefore(lastCardClone, cards.firstChild);
    	
    	const interval = setInterval(() => {
    			console.log('beep');
    		}, 1000);

    	return () => clearInterval(interval);
    });

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			$$invalidate('cards', cards = $$value);
    		});
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ('cards' in $$props) $$invalidate('cards', cards = $$props.cards);
    	};

    	return { promoInfo, total, cards, div_binding };
    }

    class PromoCards extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$3, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "PromoCards", options, id: create_fragment$3.name });
    	}
    }

    /* src/components/Profile.svelte generated by Svelte v3.12.1 */

    const file$4 = "src/components/Profile.svelte";

    // (8:1) <h2 slot="title" class="title">
    function create_title_slot(ctx) {
    	var h2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "@username";
    			attr_dev(h2, "slot", "title");
    			attr_dev(h2, "class", "title svelte-16ybjhd");
    			add_location(h2, file$4, 7, 1, 188);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(h2);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_title_slot.name, type: "slot", source: "(8:1) <h2 slot=\"title\" class=\"title\">", ctx });
    	return block;
    }

    // (7:0) <AccountScreen swipeable>
    function create_default_slot(ctx) {
    	var t0, div, img, t1, t2, current;

    	var balance = new Balance({ $$inline: true });

    	var promocards = new PromoCards({ $$inline: true });

    	const block = {
    		c: function create() {
    			t0 = space();
    			div = element("div");
    			img = element("img");
    			t1 = space();
    			balance.$$.fragment.c();
    			t2 = space();
    			promocards.$$.fragment.c();
    			attr_dev(img, "class", "avatar svelte-16ybjhd");
    			attr_dev(img, "alt", "User's Avatar");
    			attr_dev(img, "src", "https://static.vidy.com/users/avatar.png");
    			add_location(img, file$4, 9, 2, 256);
    			attr_dev(div, "class", "card svelte-16ybjhd");
    			add_location(div, file$4, 8, 1, 235);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t1);
    			mount_component(balance, div, null);
    			insert_dev(target, t2, anchor);
    			mount_component(promocards, target, anchor);
    			current = true;
    		},

    		p: noop,

    		i: function intro(local) {
    			if (current) return;
    			transition_in(balance.$$.fragment, local);

    			transition_in(promocards.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(balance.$$.fragment, local);
    			transition_out(promocards.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(t0);
    				detach_dev(div);
    			}

    			destroy_component(balance);

    			if (detaching) {
    				detach_dev(t2);
    			}

    			destroy_component(promocards, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_default_slot.name, type: "slot", source: "(7:0) <AccountScreen swipeable>", ctx });
    	return block;
    }

    function create_fragment$4(ctx) {
    	var current;

    	var accountscreen = new AccountScreen({
    		props: {
    		swipeable: true,
    		$$slots: {
    		default: [create_default_slot],
    		title: [create_title_slot]
    	},
    		$$scope: { ctx }
    	},
    		$$inline: true
    	});

    	const block = {
    		c: function create() {
    			accountscreen.$$.fragment.c();
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			mount_component(accountscreen, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var accountscreen_changes = {};
    			if (changed.$$scope) accountscreen_changes.$$scope = { changed, ctx };
    			accountscreen.$set(accountscreen_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(accountscreen.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(accountscreen.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(accountscreen, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$4.name, type: "component", source: "", ctx });
    	return block;
    }

    class Profile extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$4, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Profile", options, id: create_fragment$4.name });
    	}
    }

    const unextendable = new Date().toISOString();
    	const extendable = new Date(Date.now() - 9e7).toISOString();
    	const urgent = new Date(Date.now() - 1.71e8).toISOString();

    /* src/components/Streaks.svelte generated by Svelte v3.12.1 */

    const file$5 = "src/components/Streaks.svelte";

    // (7:1) <h2 slot="title" class="title">
    function create_title_slot$1(ctx) {
    	var h2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Streaks";
    			attr_dev(h2, "slot", "title");
    			attr_dev(h2, "class", "title svelte-7kack3");
    			add_location(h2, file$5, 6, 1, 146);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(h2);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_title_slot$1.name, type: "slot", source: "(7:1) <h2 slot=\"title\" class=\"title\">", ctx });
    	return block;
    }

    // (6:0) <AccountScreen swipeable>
    function create_default_slot$1(ctx) {
    	var t, div, img;

    	const block = {
    		c: function create() {
    			t = space();
    			div = element("div");
    			img = element("img");
    			attr_dev(img, "class", "avatar svelte-7kack3");
    			attr_dev(img, "src", "https://i.imgur.com/v47Gy36.png");
    			add_location(img, file$5, 8, 2, 199);
    			attr_dev(div, "class", "svelte-7kack3");
    			add_location(div, file$5, 7, 1, 191);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    		},

    		p: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(t);
    				detach_dev(div);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_default_slot$1.name, type: "slot", source: "(6:0) <AccountScreen swipeable>", ctx });
    	return block;
    }

    function create_fragment$5(ctx) {
    	var current;

    	var accountscreen = new AccountScreen({
    		props: {
    		swipeable: true,
    		$$slots: {
    		default: [create_default_slot$1],
    		title: [create_title_slot$1]
    	},
    		$$scope: { ctx }
    	},
    		$$inline: true
    	});

    	const block = {
    		c: function create() {
    			accountscreen.$$.fragment.c();
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			mount_component(accountscreen, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var accountscreen_changes = {};
    			if (changed.$$scope) accountscreen_changes.$$scope = { changed, ctx };
    			accountscreen.$set(accountscreen_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(accountscreen.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(accountscreen.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(accountscreen, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$5.name, type: "component", source: "", ctx });
    	return block;
    }

    class Streaks extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$5, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Streaks", options, id: create_fragment$5.name });
    	}
    }

    /* src/components/Wallet.svelte generated by Svelte v3.12.1 */

    const file$6 = "src/components/Wallet.svelte";

    // (7:1) <h2 slot="title" class="title">
    function create_title_slot$2(ctx) {
    	var h2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Wallet";
    			attr_dev(h2, "slot", "title");
    			attr_dev(h2, "class", "title svelte-t133dp");
    			add_location(h2, file$6, 6, 1, 141);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(h2);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_title_slot$2.name, type: "slot", source: "(7:1) <h2 slot=\"title\" class=\"title\">", ctx });
    	return block;
    }

    // (6:0) <AccountScreen swipeable>
    function create_default_slot$2(ctx) {
    	var t, div, img;

    	const block = {
    		c: function create() {
    			t = space();
    			div = element("div");
    			img = element("img");
    			attr_dev(img, "src", "https://i.imgur.com/CqUfJMN.png");
    			add_location(img, file$6, 8, 2, 193);
    			attr_dev(div, "class", "svelte-t133dp");
    			add_location(div, file$6, 7, 1, 185);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    		},

    		p: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(t);
    				detach_dev(div);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_default_slot$2.name, type: "slot", source: "(6:0) <AccountScreen swipeable>", ctx });
    	return block;
    }

    function create_fragment$6(ctx) {
    	var current;

    	var accountscreen = new AccountScreen({
    		props: {
    		swipeable: true,
    		$$slots: {
    		default: [create_default_slot$2],
    		title: [create_title_slot$2]
    	},
    		$$scope: { ctx }
    	},
    		$$inline: true
    	});

    	const block = {
    		c: function create() {
    			accountscreen.$$.fragment.c();
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			mount_component(accountscreen, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var accountscreen_changes = {};
    			if (changed.$$scope) accountscreen_changes.$$scope = { changed, ctx };
    			accountscreen.$set(accountscreen_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(accountscreen.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(accountscreen.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(accountscreen, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$6.name, type: "component", source: "", ctx });
    	return block;
    }

    class Wallet extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$6, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Wallet", options, id: create_fragment$6.name });
    	}
    }

    /* src/components/AccountMain.svelte generated by Svelte v3.12.1 */

    const file$7 = "src/components/AccountMain.svelte";

    function create_fragment$7(ctx) {
    	var div, t0, t1, current;

    	var wallet = new Wallet({ $$inline: true });

    	var profile = new Profile({ $$inline: true });

    	var streaks = new Streaks({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			wallet.$$.fragment.c();
    			t0 = space();
    			profile.$$.fragment.c();
    			t1 = space();
    			streaks.$$.fragment.c();
    			attr_dev(div, "class", "main svelte-1fmdw5k");
    			add_location(div, file$7, 28, 0, 621);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(wallet, div, null);
    			append_dev(div, t0);
    			mount_component(profile, div, null);
    			append_dev(div, t1);
    			mount_component(streaks, div, null);
    			ctx.div_binding(div);
    			current = true;
    		},

    		p: noop,

    		i: function intro(local) {
    			if (current) return;
    			transition_in(wallet.$$.fragment, local);

    			transition_in(profile.$$.fragment, local);

    			transition_in(streaks.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(wallet.$$.fragment, local);
    			transition_out(profile.$$.fragment, local);
    			transition_out(streaks.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}

    			destroy_component(wallet);

    			destroy_component(profile);

    			destroy_component(streaks);

    			ctx.div_binding(null);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$7.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $mainScreen;

    	validate_store(mainScreen, 'mainScreen');
    	component_subscribe($$self, mainScreen, $$value => { $mainScreen = $$value; $$invalidate('$mainScreen', $mainScreen); });

    	

    	let main;

    	const scrollIndex = {
    		'Wallet': 0,
    		'Profile': 1,
    		'Streaks': 2,
    	};

    	onMount(() => {
    		$$invalidate('main', main.style.scrollBehavior = 'auto', main);
    		$$invalidate('main', main.scrollLeft = scrollIndex[$mainScreen] * main.clientWidth, main);
    		$$invalidate('main', main.scrollTop = 0, main);
    		main.removeAttribute('style');
    	});

    	beforeUpdate(() => {
    		main && ($$invalidate('main', main.scrollLeft = scrollIndex[$mainScreen] * main.clientWidth, main));
    	});

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			$$invalidate('main', main = $$value);
    		});
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ('main' in $$props) $$invalidate('main', main = $$props.main);
    		if ('$mainScreen' in $$props) mainScreen.set($mainScreen);
    	};

    	return { main, div_binding };
    }

    class AccountMain extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$7, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "AccountMain", options, id: create_fragment$7.name });
    	}
    }

    /* src/components/Settings.svelte generated by Svelte v3.12.1 */

    const file$8 = "src/components/Settings.svelte";

    // (6:1) <h2 slot="title" class="title">
    function create_title_slot$3(ctx) {
    	var h2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Settings";
    			attr_dev(h2, "slot", "title");
    			attr_dev(h2, "class", "title svelte-rv654w");
    			add_location(h2, file$8, 5, 1, 90);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(h2);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_title_slot$3.name, type: "slot", source: "(6:1) <h2 slot=\"title\" class=\"title\">", ctx });
    	return block;
    }

    // (5:0) <AccountScreen>
    function create_default_slot$3(ctx) {
    	var t, div, img;

    	const block = {
    		c: function create() {
    			t = space();
    			div = element("div");
    			img = element("img");
    			attr_dev(img, "class", "avatar svelte-rv654w");
    			attr_dev(img, "src", "https://i.imgur.com/lrqk90Q.png");
    			add_location(img, file$8, 7, 2, 144);
    			attr_dev(div, "class", "svelte-rv654w");
    			add_location(div, file$8, 6, 1, 136);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    		},

    		p: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(t);
    				detach_dev(div);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_default_slot$3.name, type: "slot", source: "(5:0) <AccountScreen>", ctx });
    	return block;
    }

    function create_fragment$8(ctx) {
    	var current;

    	var accountscreen = new AccountScreen({
    		props: {
    		$$slots: {
    		default: [create_default_slot$3],
    		title: [create_title_slot$3]
    	},
    		$$scope: { ctx }
    	},
    		$$inline: true
    	});

    	const block = {
    		c: function create() {
    			accountscreen.$$.fragment.c();
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			mount_component(accountscreen, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var accountscreen_changes = {};
    			if (changed.$$scope) accountscreen_changes.$$scope = { changed, ctx };
    			accountscreen.$set(accountscreen_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(accountscreen.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(accountscreen.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(accountscreen, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$8.name, type: "component", source: "", ctx });
    	return block;
    }

    class Settings extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$8, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Settings", options, id: create_fragment$8.name });
    	}
    }

    /* src/components/Rewards.svelte generated by Svelte v3.12.1 */

    const file$9 = "src/components/Rewards.svelte";

    // (6:1) <h2 slot="title" class="title">
    function create_title_slot$4(ctx) {
    	var h2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Rewards";
    			attr_dev(h2, "slot", "title");
    			attr_dev(h2, "class", "title svelte-1xnmh43");
    			add_location(h2, file$9, 5, 1, 99);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(h2);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_title_slot$4.name, type: "slot", source: "(6:1) <h2 slot=\"title\" class=\"title\">", ctx });
    	return block;
    }

    // (5:0) <AccountScreen swipeable>
    function create_default_slot$4(ctx) {
    	var t, div, img;

    	const block = {
    		c: function create() {
    			t = space();
    			div = element("div");
    			img = element("img");
    			attr_dev(img, "src", "https://i.imgur.com/8HK8n46.png");
    			attr_dev(img, "class", "svelte-1xnmh43");
    			add_location(img, file$9, 7, 2, 152);
    			attr_dev(div, "class", "svelte-1xnmh43");
    			add_location(div, file$9, 6, 1, 144);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    		},

    		p: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(t);
    				detach_dev(div);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_default_slot$4.name, type: "slot", source: "(5:0) <AccountScreen swipeable>", ctx });
    	return block;
    }

    function create_fragment$9(ctx) {
    	var current;

    	var accountscreen = new AccountScreen({
    		props: {
    		swipeable: true,
    		$$slots: {
    		default: [create_default_slot$4],
    		title: [create_title_slot$4]
    	},
    		$$scope: { ctx }
    	},
    		$$inline: true
    	});

    	const block = {
    		c: function create() {
    			accountscreen.$$.fragment.c();
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			mount_component(accountscreen, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var accountscreen_changes = {};
    			if (changed.$$scope) accountscreen_changes.$$scope = { changed, ctx };
    			accountscreen.$set(accountscreen_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(accountscreen.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(accountscreen.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(accountscreen, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$9.name, type: "component", source: "", ctx });
    	return block;
    }

    class Rewards extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$9, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Rewards", options, id: create_fragment$9.name });
    	}
    }

    /* src/components/AccountNav.svelte generated by Svelte v3.12.1 */

    const file$a = "src/components/AccountNav.svelte";

    function create_fragment$a(ctx) {
    	var nav, button0, button0_class_value, t0, div1, button1, t1, button2, t2, button3, t3, div0, t4, button4, button4_class_value, dispose;

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			button0 = element("button");
    			t0 = space();
    			div1 = element("div");
    			button1 = element("button");
    			t1 = space();
    			button2 = element("button");
    			t2 = space();
    			button3 = element("button");
    			t3 = space();
    			div0 = element("div");
    			t4 = space();
    			button4 = element("button");
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "class", button0_class_value = "" + null_to_empty((ctx.selectedScreenName === 'Rewards' ? 'rewards selected' : 'rewards')) + " svelte-1hz6dnr");
    			add_location(button0, file$a, 23, 1, 622);
    			attr_dev(button1, "type", "button");
    			attr_dev(button1, "class", "wallet svelte-1hz6dnr");
    			toggle_class(button1, "current", ctx.$mainScreen === 'Wallet');
    			toggle_class(button1, "selected", ctx.selectedScreenName === 'Wallet');
    			add_location(button1, file$a, 25, 2, 779);
    			attr_dev(button2, "type", "button");
    			attr_dev(button2, "class", "profile svelte-1hz6dnr");
    			toggle_class(button2, "current", ctx.$mainScreen === 'Profile');
    			toggle_class(button2, "selected", ctx.selectedScreenName === 'Profile');
    			add_location(button2, file$a, 26, 2, 947);
    			attr_dev(button3, "type", "button");
    			attr_dev(button3, "class", "streaks svelte-1hz6dnr");
    			toggle_class(button3, "current", ctx.$mainScreen === 'Streaks');
    			toggle_class(button3, "selected", ctx.selectedScreenName === 'Streaks');
    			add_location(button3, file$a, 27, 2, 1119);
    			attr_dev(div0, "class", "indicator svelte-1hz6dnr");
    			toggle_class(div0, "wallet", ctx.wallet);
    			toggle_class(div0, "profile", ctx.profile);
    			toggle_class(div0, "streaks", ctx.streaks);
    			add_location(div0, file$a, 28, 2, 1291);
    			attr_dev(div1, "class", "pill svelte-1hz6dnr");
    			add_location(div1, file$a, 24, 1, 758);
    			attr_dev(button4, "type", "button");
    			attr_dev(button4, "class", button4_class_value = "" + null_to_empty((ctx.$stackedScreen && ctx.$stackedScreen.name === 'Settings' ? 'settings selected' : 'settings')) + " svelte-1hz6dnr");
    			add_location(button4, file$a, 30, 1, 1367);
    			attr_dev(nav, "class", "svelte-1hz6dnr");
    			add_location(nav, file$a, 22, 0, 615);

    			dispose = [
    				listen_dev(button0, "click", ctx.click_handler),
    				listen_dev(button1, "click", ctx.click_handler_1),
    				listen_dev(button2, "click", ctx.click_handler_2),
    				listen_dev(button3, "click", ctx.click_handler_3),
    				listen_dev(button4, "click", ctx.click_handler_4)
    			];
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, button0);
    			append_dev(nav, t0);
    			append_dev(nav, div1);
    			append_dev(div1, button1);
    			append_dev(div1, t1);
    			append_dev(div1, button2);
    			append_dev(div1, t2);
    			append_dev(div1, button3);
    			append_dev(div1, t3);
    			append_dev(div1, div0);
    			append_dev(nav, t4);
    			append_dev(nav, button4);
    		},

    		p: function update(changed, ctx) {
    			if ((changed.selectedScreenName) && button0_class_value !== (button0_class_value = "" + null_to_empty((ctx.selectedScreenName === 'Rewards' ? 'rewards selected' : 'rewards')) + " svelte-1hz6dnr")) {
    				attr_dev(button0, "class", button0_class_value);
    			}

    			if (changed.$mainScreen) {
    				toggle_class(button1, "current", ctx.$mainScreen === 'Wallet');
    			}

    			if (changed.selectedScreenName) {
    				toggle_class(button1, "selected", ctx.selectedScreenName === 'Wallet');
    			}

    			if (changed.$mainScreen) {
    				toggle_class(button2, "current", ctx.$mainScreen === 'Profile');
    			}

    			if (changed.selectedScreenName) {
    				toggle_class(button2, "selected", ctx.selectedScreenName === 'Profile');
    			}

    			if (changed.$mainScreen) {
    				toggle_class(button3, "current", ctx.$mainScreen === 'Streaks');
    			}

    			if (changed.selectedScreenName) {
    				toggle_class(button3, "selected", ctx.selectedScreenName === 'Streaks');
    			}

    			if (changed.wallet) {
    				toggle_class(div0, "wallet", ctx.wallet);
    			}

    			if (changed.profile) {
    				toggle_class(div0, "profile", ctx.profile);
    			}

    			if (changed.streaks) {
    				toggle_class(div0, "streaks", ctx.streaks);
    			}

    			if ((changed.$stackedScreen) && button4_class_value !== (button4_class_value = "" + null_to_empty((ctx.$stackedScreen && ctx.$stackedScreen.name === 'Settings' ? 'settings selected' : 'settings')) + " svelte-1hz6dnr")) {
    				attr_dev(button4, "class", button4_class_value);
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(nav);
    			}

    			run_all(dispose);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$a.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let $stackedScreen, $mainScreen;

    	validate_store(stackedScreen, 'stackedScreen');
    	component_subscribe($$self, stackedScreen, $$value => { $stackedScreen = $$value; $$invalidate('$stackedScreen', $stackedScreen); });
    	validate_store(mainScreen, 'mainScreen');
    	component_subscribe($$self, mainScreen, $$value => { $mainScreen = $$value; $$invalidate('$mainScreen', $mainScreen); });

    	

    	const navigate = screen => {
    		if (typeof screen === 'function') {
    			set_store_value(stackedScreen, $stackedScreen = $stackedScreen === screen ? null : screen);
    		} else if (typeof screen === 'string') {
    			set_store_value(mainScreen, $mainScreen = screen);
    			set_store_value(stackedScreen, $stackedScreen = null);
    		}
    	};

    	const click_handler = () => navigate(Rewards);

    	const click_handler_1 = () => navigate('Wallet');

    	const click_handler_2 = () => navigate('Profile');

    	const click_handler_3 = () => navigate('Streaks');

    	const click_handler_4 = () => navigate(Settings);

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ('$stackedScreen' in $$props) stackedScreen.set($stackedScreen);
    		if ('$mainScreen' in $$props) mainScreen.set($mainScreen);
    		if ('selectedScreenName' in $$props) $$invalidate('selectedScreenName', selectedScreenName = $$props.selectedScreenName);
    		if ('wallet' in $$props) $$invalidate('wallet', wallet = $$props.wallet);
    		if ('profile' in $$props) $$invalidate('profile', profile = $$props.profile);
    		if ('streaks' in $$props) $$invalidate('streaks', streaks = $$props.streaks);
    	};

    	let selectedScreenName, wallet, profile, streaks;

    	$$self.$$.update = ($$dirty = { $stackedScreen: 1, $mainScreen: 1 }) => {
    		if ($$dirty.$stackedScreen || $$dirty.$mainScreen) { $$invalidate('selectedScreenName', selectedScreenName = $stackedScreen ? $stackedScreen.name : $mainScreen); }
    		if ($$dirty.$mainScreen) { $$invalidate('wallet', wallet = $mainScreen === 'Wallet'); }
    		if ($$dirty.$mainScreen) { $$invalidate('profile', profile = $mainScreen === 'Profile'); }
    		if ($$dirty.$mainScreen) { $$invalidate('streaks', streaks = $mainScreen === 'Streaks'); }
    	};

    	return {
    		navigate,
    		$stackedScreen,
    		$mainScreen,
    		selectedScreenName,
    		wallet,
    		profile,
    		streaks,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4
    	};
    }

    class AccountNav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$a, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "AccountNav", options, id: create_fragment$a.name });
    	}
    }

    /* src/components/Account.svelte generated by Svelte v3.12.1 */

    const file$b = "src/components/Account.svelte";

    function create_fragment$b(ctx) {
    	var div, t, current;

    	var switch_value = ctx.currentScreen;

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props());
    	}

    	var accountnav = new AccountNav({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (switch_instance) switch_instance.$$.fragment.c();
    			t = space();
    			accountnav.$$.fragment.c();
    			attr_dev(div, "class", "account svelte-1qfw8y7");
    			add_location(div, file$b, 8, 0, 259);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (switch_instance) {
    				mount_component(switch_instance, div, null);
    			}

    			append_dev(div, t);
    			mount_component(accountnav, div, null);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (switch_value !== (switch_value = ctx.currentScreen)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;
    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});
    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());

    					switch_instance.$$.fragment.c();
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, div, t);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);

    			transition_in(accountnav.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			transition_out(accountnav.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}

    			if (switch_instance) destroy_component(switch_instance);

    			destroy_component(accountnav);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$b.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let $stackedScreen;

    	validate_store(stackedScreen, 'stackedScreen');
    	component_subscribe($$self, stackedScreen, $$value => { $stackedScreen = $$value; $$invalidate('$stackedScreen', $stackedScreen); });

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ('currentScreen' in $$props) $$invalidate('currentScreen', currentScreen = $$props.currentScreen);
    		if ('$stackedScreen' in $$props) stackedScreen.set($stackedScreen);
    	};

    	let currentScreen;

    	$$self.$$.update = ($$dirty = { $stackedScreen: 1 }) => {
    		if ($$dirty.$stackedScreen) { $$invalidate('currentScreen', currentScreen = $stackedScreen ? $stackedScreen : AccountMain); }
    	};

    	return { currentScreen };
    }

    class Account extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$b, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Account", options, id: create_fragment$b.name });
    	}
    }

    /* src/components/App.svelte generated by Svelte v3.12.1 */

    function create_fragment$c(ctx) {
    	var current;

    	var account = new Account({ $$inline: true });

    	const block = {
    		c: function create() {
    			account.$$.fragment.c();
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			mount_component(account, target, anchor);
    			current = true;
    		},

    		p: noop,

    		i: function intro(local) {
    			if (current) return;
    			transition_in(account.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(account.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(account, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$c.name, type: "component", source: "", ctx });
    	return block;
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$c, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "App", options, id: create_fragment$c.name });
    	}
    }

    var app = new App({
    	target: document.body
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
