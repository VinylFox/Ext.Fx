/**
 * @author Mitchell Simoens - http://www.simoens.org
 * @license MIT - http://www.opensource.org/licenses/mit-license.php
 * <p>A 'Shift' effect for the ExtJS Fx class using CSS3</p>
 * <p>Currently, there is NO way to stop/pause CSS Transform</p>
 */
Ext.apply(Ext.Fx, {
	/**
     * Shifts an element on the X and Y axis.
     * Usage:
     *<pre><code>
          // default: shifts an element to original state (x:0 y:0)
          el.CSS3Shift();

          // custom: shifts an element with a duration of 5000 milliseconds and to the left 100px and up 100px
          el.CSS3ZoomOut({ duration: 5000, x: 100, y: -100 });
          
          //NOTE: if you want to return to original position, just pass zeros (0) as x and y parameter
     </code></pre>
     * @param {Object} options (optional) Object literal with any of the CSS3Shift config options (duration)
     * @return {Ext.Element} The Element
     */
	CSS3Shift: function(o) {
		o = Ext.applyIf(o || {}, {
	        duration: 2000,
	        x: 0,
	        y: 0,
	        easing: "linear"
	    });
		this.setStyle({
			"-webkit-transform": "translate("+o.x+"px, "+o.y+"px)",
			"-webkit-transition-timing-function": o.easing,
			"-webkit-transition-duration": o.duration+"ms",
			"-moz-transition": "-o-transform "+o.duration+"s "+o.easing,
			"-moz-transform": "translate("+o.x+"px, "+o.y+"px)",
			"-o-transition": "-o-transform "+o.duration+"s "+o.easing,
			"-o-transform": "translate("+o.x+"px, "+o.y+"px)"
		});
		this.afterFx(o, this);
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