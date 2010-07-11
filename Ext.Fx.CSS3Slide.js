/**
 * @author Mitchell Simoens - http://www.simoens.org
 * @license MIT - http://www.opensource.org/licenses/mit-license.php
 * <p>A 'Slide' effect for the ExtJS Fx class using CSS3</p>
 * <p>Currently, there is NO way to stop/pause CSS Transform</p>
 */
Ext.apply(Ext.Fx, {
	/**
     * Slides an element in.
     * Usage:
     *<pre><code>
          // default: Slide in an element taking 2000 milliseconds
          el.CSS3SlideIn();

          // custom: Slide in an element taking 5000 milliseconds
          el.CSS3SlideIn({ duration: 5000 });
     </code></pre>
     * @param {Object} options (optional) Object literal with any of the CSS3SlideIn config options (duration)
     * @return {Ext.Element} The Element
     */
	CSS3SlideIn: function(o) {
		o = Ext.applyIf(o || {}, {
	        duration: 2000
	    });
		this.CSS3SlideToggle(o);
		return this;
	},
	/**
     * Slides an element out.
     * Usage:
     *<pre><code>
          // default: Slide out an element taking 2000 milliseconds to travel left 200 and bottom 500
          el.CSS3SlideOut();

          // custom: Slides out an element taking 5000 milliseconds to travel right 500 and top 500
          el.CSS3SlideOut({ duration: 5000, margin: { left: 500, top: -500 } });
     </code></pre>
     * @param {Object} options (optional) Object literal with any of the CSS3SlideOut config options (duration, margin)
     * @return {Ext.Element} The Element
     */
	CSS3SlideOut: function(o) {
		o = Ext.applyIf(o || {}, {
	        duration: 2000,
	        margin: {
				left: 200,
				top: 200
			},
	        remove: true
	    });
		this.CSS3SlideToggle(o);
		return this;
	},
	/**
     * Toggles the sliding of an element.
     * Usage:
     *<pre><code>
          // default: Toggle the slide of an element taking 2000 milliseconds
          el.CSS3SlideToggle();

          // custom: Toggle the slide of an element taking 5000 milliseconds to travel right 500 and top 500
          el.CSS3SlideToggle({ duration: 5000, margin: { left: 500, top: -500 } });
     </code></pre>
     * @param {Object} options (optional) Object literal with any of the CSS3SlideToggle config options (duration, margin)
     * the margin object is only used if the element is going to slide out
     * @return {Ext.Element} The Element
     */
	CSS3SlideToggle: function(o) {
		o = Ext.applyIf(o || {}, {
	        duration: 2000,
	        margin: {
				left: 0,
				top: 0
			},
	        remove: false
	    });
		if (this.getStyle("margin-left").replace("px", "") > 0 || this.getStyle("margin-top").replace("px", "") > 0) {
			o.margin = {
				left: 0,
				top: 0
			};
		}
		this.setStyle({
			"-webkit-transition": "margin",
			"-webkit-transition-timing-function": "ease-in",
			"-webkit-transition-duration": +o.duration+"ms",
			"-moz-transition": "margin",
			"-moz-transition-timing-function": "ease-in",
			"-moz-transition-duration": +o.duration+"ms",
			"margin-left": o.margin.left+"px",
			"margin-top": o.margin.top+"px"
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
			el.addListener("webkitTransitionEnd", o.callback, el, {
				single: true
			});
		}
	}
});

Ext.Element.addMethods(Ext.Fx);