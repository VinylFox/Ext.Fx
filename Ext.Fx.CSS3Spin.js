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
          // default: Spin infinite times taking 8000 millisecond to complete a 360 2D spin
          el.CSS3Spin();

          // custom: 3D spins 5 times taking 5 seconds each time. Total effect time would be 2500 millisecond (5 spins * 5000 millisecond)
          el.CSS3Spin({ duration: 5000, spins: 5, enable3d: true, perspective: 300 });
     </code></pre>
     * @param {Object} options (optional) Object literal with any of the CSS3Spin config options (duration, number of spins, 3D, perspective)
     * @return {Ext.Element} The Element
     */
	CSS3Spin: function(o) {
		o = Ext.applyIf(o || {}, {
	        duration: 8000,
	        spins: "infinite",
	        enable3d: false,
	        perspective: 900,
	        stylesheets: {}
	    });
		if (o.spins === -1) {
			o.spins = "infinite";
		}
		o.stylesheets.ani = Ext.id();
		o.stylesheets.cls = Ext.id();
		o.stylesheets.cls_name = o.stylesheets.cls.replace("-", "");
		var stylesheet_ani = "@-webkit-keyframes spin {from { -webkit-transform: rotateY(0); }to   { -webkit-transform: rotateY(-360deg); }}";
		var stylesheet_class = "."+o.stylesheets.cls_name+" {-webkit-animation: spin "+o.duration+"ms "+o.spins+" linear;}";
		if (o.enable3d === true) {
			stylesheet_ani = "@-webkit-keyframes spin3d {0%    { -webkit-transform: rotateY(0deg); }50%   { -webkit-transform: rotateY(180deg) perspective("+o.perspective+"); }100%  { -webkit-transform: rotateY(360deg); }}";
			stylesheet_class = "."+o.stylesheets.cls_name+" {-webkit-animation: spin3d "+o.duration+"ms "+o.spins+" linear;-webkit-transform-style: preserve-3d;}";
		}
		Ext.util.CSS.createStyleSheet(stylesheet_ani, o.stylesheets.ani);
		Ext.util.CSS.createStyleSheet(stylesheet_class, o.stylesheets.cls);
		this.addClass(o.stylesheets.cls_name);
		
		new Ext.util.DelayedTask(function() {
			Ext.util.CSS.removeStyleSheet(o.stylesheets.ani);
			Ext.util.CSS.removeStyleSheet(o.stylesheets.cls);
			this.removeClass(o.stylesheets.cls_name);
		}, this).delay(o.duration+150);
		
		return this;
	}
});

Ext.Element.addMethods(Ext.Fx);