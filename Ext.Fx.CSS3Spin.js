/**
 * @author Mitchell Simoens - http://www.simoens.org
 * @license MIT - http://www.opensource.org/licenses/mit-license.php
 * <p>A 'Spin' effect for the ExtJS Fx class using CSS3</p>
 * <p>Currently, there is NO way to stop/pause CSS Transform</p>
 */
Ext.apply(Ext.Fx, {
	/**
     * Spins an element 360 degrees.
     * Usage:
     *<pre><code>
          // default: Spin infinite times taking 8000 millisecond to complete a 360 spin
          el.CSS3Spin();

          // custom: spins 5 times taking 5 seconds each time. Total effect time would be 2500 millisecond (5 spins * 5000 millisecond)
          el.CSS3Spin({ duration: 5000, spins: 5 });
     </code></pre>
     * @param {Object} options (optional) Object literal with any of the CSS3Spin config options (duration and number of spins)
     * @return {Ext.Element} The Element
     */
	CSS3Spin: function(o) {
		o = Ext.applyIf(o || {}, {
	        duration: 8000,
	        spins: "infinite"
	    });
		if (o.spins === -1) {
			o.spins = "infinite";
		}
		Ext.util.CSS.createStyleSheet("@-webkit-keyframes spin {from { -webkit-transform: rotateY(0); }to   { -webkit-transform: rotateY(-360deg); }}");
		this.applyStyles("-webkit-animation: spin "+o.duration+"ms "+o.spins+" linear;");
		return this;
	}
});

Ext.Element.addMethods(Ext.Fx);