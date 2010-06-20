/**
 * @author Nigel (Animal) White
 * <p>A text ripple effect for the ExtJS Fx class.</p>
 */
Ext.apply(Ext.Fx, (function(){

//  Snip an element's Character nodes into single character <spans> and return them in an Array.
    function collectCharSpans(el) {
        var i, c, l, n, f, s, ch, sp, result = [];

//      Copy existing chidl nodes because we will be removing them while looping through
//      IE barfs when calling Array methods no NodeLists, so catch that!
        try {
            c = Array.prototype.slice.call(el.childNodes, 0);
        } catch (e) {
            c = [];
            for (i = 0, l = el.childNodes.length; i < l; i++) {
                c[i] = el.childNodes[i];
            }
        }

        for (i = 0, l = c.length; i < l; i++) {
            n = c[i];
            if (n.nodeType == 3) { // text node
                f = document.createDocumentFragment();
                s = n.nodeValue;
                for (var j = 0; j < s.length; j++) {
                    sp = document.createElement("span");
                    sp.style.position = 'relative';
                    sp.className = 'x-single-char-span';
                    ch = s.substr(j, 1);
                    sp.innerHTML = (Ext.isIE && (ch == ' ')) ? '&#173; ' : ch; // IE collapses spans which only contain whitespace!
                    result.push(sp);
                    f.appendChild(sp);
                }
                el.replaceChild(f, n);
            } else if (n.nodeType == 1) { // element
                if (n.tagName.toLowerCase() == 'span' && n.className == 'x-single-char-span') {
                    result.push(n);
                } else {
                    result.concat(collectCharSpans(n));
                }
            }
        }
        return result;
    }

    function animTop(el, pos, duration, cb) {
        var a = new Ext.lib.AnimBase(el, {'top': {to: pos, unit: 'px'}}, duration);
        return a.animateX.createDelegate(a, [cb]);
    }

    return {
        /**
         * Ripples each individual letter of an element upwards then back into place in sequence from left to right across the element.
         * Usage:
         *<pre><code>
// default: Ripples letters up/down by half of the element height, one character every 1/10th of a second.
el.rippleText();

// custom: Ripples letters up/down by one third of the element height, one character every 1/10th of a second.
el.rippleText({fraction: 0.3});

// custom: Ripples letters up/down by 20 pixels, with each phase lasting 0.1 of a second, one character every 1/20th of a second.
el.rippleText({height: 20, duration: 0.1, interval: 0.05});
</code></pre>
         * @param {Object} options (optional) Object literal with any of the rippleText config options (height, fraction, duration, interval)
         * @return {Ext.Element} The Element
         */
        rippleText: function(o) {
            o = o || {};
            var me = this,
                h = o.height || me.getHeight() * (o.fraction || 0.5),
                duration = o.duration || 0.25,
                interval = (o.interval * 1000) || 100,
                charSpans = collectCharSpans(me.dom),
                l = charSpans.length, lm1 = l - 1,
                i,
                afterFn = function() {
                    me.afterFx(o);
                }
                
            for (i = 0; i < l; i++) {
                animTop(charSpans[i], -h, duration, animTop(charSpans[i], 0, duration, (i == lm1) ? afterFn : null)).defer(i * interval);
            }
            return me;
        }
    }
})());

Ext.Element.addMethods(Ext.Fx);