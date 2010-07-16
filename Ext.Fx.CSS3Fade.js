/**
 * @author Mitchell Simoens - http://www.simoens.org
 * @license MIT - http://www.opensource.org/licenses/mit-license.php
 * <p>A 'Fade' effect for the ExtJS Fx class using CSS3</p>
 * <p>Currently, there is NO way to stop/pause CSS Transform</p>
 */
Ext.apply(Ext.Fx, {
	/**
     * Fades an element in.
     * Usage:
     *<pre><code>
          // default: Fade from 0% opacity to 100% opacity in 2000 millisecond
          el.CSS3FadeIn();

          // custom: Fades in an element taking 5000 millisecond to fade in
          el.CSS3FadeIn({ duration: 5000 });
     </code></pre>
     * @param {Object} options (optional) Object literal with any of the CSS3FadeIn config options (duration)
     * @return {Ext.Element} The Element
     */
	CSS3FadeIn: function(o) {
		o = Ext.applyIf(o || {}, {
	        duration: 2000
	    });
		o.direction = 1;
		return this.CSS3FadeToggle(o);
	},
	/**
     * Fades an element out.
     * Usage:
     *<pre><code>
          // default: Fade from 100% opacity to 0% opacity in 2000 milliseconds
          el.CSS3FadeOut();

          // custom: Fades out an element taking 5000 milliseconds to fade out
          el.CSS3FadeOut({ duration: 5000 });
     </code></pre>
     * @param {Object} options (optional) Object literal with any of the CSS3FadeOut config options (duration)
     * @return {Ext.Element} The Element
     */
	CSS3FadeOut: function(o) {
		o = Ext.applyIf(o || {}, {
	        duration: 2000,
	        remove: true
	    });
		o.direction = 0;
		return this.CSS3FadeToggle(o);
	},
	/**
     * Toggles between fade an element in or out.
     * Usage:
     *<pre><code>
          // default: Toggle the fade in or out taking 2000 milliseconds
          el.CSS3FadeToggle();

          // custom: Toggle the fade in or out taking 5000 milliseconds
          el.CSS3FadeToggle({ duration: 5000 });
     </code></pre>
     * @param {Object} options (optional) Object literal with any of the CSS3FadeToggle config options (duration, direction)
     * @return {Ext.Element} The Element
     */
	CSS3FadeToggle: function(o) {
		o = Ext.applyIf(o || {}, {
	        duration: 2000,
	        direction: null,
	        remove: false
	    });
		if (o.direction === null) {
			o.direction = (this.getStyle("opacity") == 0) ? 1 : 0;
		}
		this.setStyle({
			"-webkit-transform": "opacity",
			"-webkit-transition-timing-function": "linear",
			"-webkit-transition-duration": o.duration+"ms",
			"-moz-transform": "opacity",
			"-moz-transition-timing-function": "linear",
			"-moz-transition-duration": o.duration+"ms",
			"opacity": o.direction
		});
		this.afterFx(o, this);
		return this;
	},
	/**
     * Removes the element from the DOM after the animation
     */
	afterFx : function(o, el) {
		if (o.remove === true) {
			new Ext.util.DelayedTask(function(){
				Ext.fly(el.dom).remove();
			}).delay(o.duration+150);
		}
		if (o.callback) {
			if (Ext.isWebKit) {
				this.addListener("webkitTransitionEnd", o.callback, this, {
					single: true
				});
			} else if (Ext.isGecko4) {
				this.addListener("transitionend", o.callback, this, {
					single: true
				});
			} else if (Ext.isOpera) {
				this.addListener("oTransitionEnd", o.callback, this, {
					single: true
				});
			}
		}
	}
});

Ext.Element.addMethods(Ext.Fx);