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
		this.applyStyles("opacity:1;-webkit-transform: scale(1);-webkit-transition-timing-function: ease-out;-webkit-transition-duration: "+o.duration+"ms;");
		return this;
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
	        duration: 250
	    });
		this.applyStyles("opacity:0;-webkit-transform: scale(0);-webkit-transition-timing-function: ease-out;-webkit-transition-duration: "+o.duration+"ms;");
		return this;
	}
});

Ext.Element.addMethods(Ext.Fx);