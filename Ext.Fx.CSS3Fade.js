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

          // custom: fades in an element taking 5000 millisecond to fade in
          el.CSS3FadeIn({ duration: 5000 });
     </code></pre>
     * @param {Object} options (optional) Object literal with any of the CSS3FadeIn config options (duration)
     * @return {Ext.Element} The Element
     */
	CSS3FadeIn: function(o) {
		o = Ext.applyIf(o || {}, {
	        duration: 2000
	    });
		this.applyStyles("opacity:1;-webkit-transition : opacity "+o.duration+"ms ease-in;");
		return this;
	},
	/**
     * Fades an element out.
     * Usage:
     *<pre><code>
          // default: Fade from 100% opacity to 0% opacity in 2 seconds
          el.CSS3FadeOut();

          // custom: fades in an element taking 5 seconds to fade out
          el.CSS3FadeOut({ duration: 5 });
     </code></pre>
     * @param {Object} options (optional) Object literal with any of the CSS3FadeOut config options (duration)
     * @return {Ext.Element} The Element
     */
	CSS3FadeOut: function(o) {
		o = Ext.applyIf(o || {}, {
	        duration: 2000
	    });
		this.applyStyles("opacity:0;-webkit-transition : opacity "+o.duration+"ms ease-out;");
		return this;
	}
});

Ext.Element.addMethods(Ext.Fx);