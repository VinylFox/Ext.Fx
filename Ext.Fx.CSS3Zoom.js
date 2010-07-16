/**
 * @author Mitchell Simoens - http://www.simoens.org
 * @license MIT - http://www.opensource.org/licenses/mit-license.php
 * <p>A 'Zoom' effect for the ExtJS Fx class using CSS3</p>
 * <p>Currently, there is NO way to stop/pause CSS Transform</p>
 */
Ext.apply(Ext.Fx, {
	/**
     * Zooms an element 360 degrees.
     * Usage:
     *<pre><code>
          // default: zooms in element with a duration of 250 milliseconds
          el.CSS3ZoomIn();

          // custom: zooms in element with a duration of 5000 milliseconds
          el.CSS3ZoomIn({ duration: 5000 });
     </code></pre>
     * @param {Object} options (optional) Object literal with any of the CSS3ZoomIn config options (duration)
     * @return {Ext.Element} The Element
     */
	CSS3ZoomIn: function(o) {
		o = Ext.applyIf(o || {}, {
	        duration: 250
	    });
		o.direction = 1;
		return this.CSS3ZoomToggle(o);
	},
	/**
     * Zooms an element 360 degrees.
     * Usage:
     *<pre><code>
          // default: zooms out element with a duration of 250 milliseconds
          el.CSS3ZoomOut();

          // custom: zooms out element with a duration of 5000 milliseconds
          el.CSS3ZoomOut({ duration: 5000 });
     </code></pre>
     * @param {Object} options (optional) Object literal with any of the CSS3ZoomOut config options (duration)
     * @return {Ext.Element} The Element
     */
	CSS3ZoomOut: function(o) {
		o = Ext.applyIf(o || {}, {
	        duration: 250,
	        remove: true
	    });
		o.direction = 0;
		return this.CSS3ZoomToggle(o);
	},
	/**
     * Toggles between zoom an element in or out.
     * Usage:
     *<pre><code>
          // default: Toggle the zoom in or out taking 250 milliseconds
          el.CSS3ZoomToggle();

          // custom: Toggle the zoom in or out taking 5000 milliseconds
          el.CSS3ZoomToggle({ duration: 5000 });
     </code></pre>
     * @param {Object} options (optional) Object literal with any of the CSS3ZoomToggle config options (duration, direction)
     * @return {Ext.Element} The Element
     */
	CSS3ZoomToggle: function(o) {
		o = Ext.applyIf(o || {}, {
	        duration: 250,
	        direction: null,
	        remove: false,
	        stylesheets: {}
	    });
		if (o.direction === null) {
			o.direction = (this.getStyle("opacity") == 0) ? 1 : 0;
		}
		this.setStyle({
			"-webkit-transform": "scale("+o.direction+")",
			"-webkit-transition-timing-function": "linear",
			"-webkit-transition-duration": o.duration+"ms",
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