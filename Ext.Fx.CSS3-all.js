/**
 * @author Mitchell Simoens - http://www.simoens.org
 * @license MIT - http://www.opensource.org/licenses/mit-license.php
 * @SVN - http://code.google.com/p/ext-fx/
 * <p>A 'Fade' effect for the ExtJS Fx class using CSS3</p>
 * <p>A 'Spin' effect for the ExtJS Fx class using CSS3</p>
 * <p>A 'Zoom' effect for the ExtJS Fx class using CSS3</p>
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
	        duration: 2000,
	        easing: "linear"
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
	        easing: "linear",
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
	        easing: "linear",
	        remove: false
	    });
		if (o.direction === null) {
			o.direction = (this.getStyle("opacity") == 0) ? 1 : 0;
		}
		this.setStyle({
			"-webkit-transform": "opacity",
			"-webkit-transition-timing-function": o.easing,
			"-webkit-transition-duration": o.duration+"ms",
			"-moz-transform": "opacity",
			"-moz-transition-timing-function": o.easing,
			"-moz-transition-duration": o.duration+"ms",
			"opacity": o.direction
		});
		this.afterFx(o, this);
		return this;
	},
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
	        duration: 2000,
	        easing: "linear"
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
	        easing: "linear",
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
	        easing: "linear",
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
			"-webkit-transition-timing-function": o.easing,
			"-webkit-transition-duration": +o.duration+"ms",
			"-moz-transition": "margin",
			"-moz-transition-timing-function": o.easing,
			"-moz-transition-duration": +o.duration+"ms",
			"margin-left": o.margin.left+"px",
			"margin-top": o.margin.top+"px"
		});
		this.afterFx(o, this);
		return this;
	},
	/**
     * Spins an element 360 degrees.
     * Usage:
     *<pre><code>
          // default: Spin infinite times taking 8000 millisecond to complete a 360 2D spin
          el.CSS3Spin();

          // custom: 3D spins 5 times taking 5 seconds each time. Total effect time would be 2500 millisecond (5 spins * 5000 millisecond)
          el.CSS3Spin({ duration: 5000, spins: 5, enable3d: true });
     </code></pre>
     * @param {Object} options (optional) Object literal with any of the CSS3Spin config options (duration, number of spins, 3D)
     * @return {Ext.Element} The Element
     */
	CSS3Spin: function(o) {
		o = Ext.applyIf(o || {}, {
	        duration: 8000,
	        spins: "infinite",
	        enable3d: false,
	        perspective: 900,
	        easing: "linear",
	        stylesheets: {}
	    });
		if (Number(o.spins) === -1) {
			o.spins = "infinite";
		}
		o.stylesheets.ani = Ext.id();
		o.stylesheets.cls = Ext.id();
		o.stylesheets.cls_name = this.id+"_spinFx";
		var stylesheet_ani = "@-webkit-keyframes spin {from { -webkit-transform: rotateY(0); }to   { -webkit-transform: rotateY(-360deg); }}";
		var stylesheet_class = "."+o.stylesheets.cls_name+" {-webkit-animation: spin "+o.duration+"ms "+o.spins+" "+o.easing+";}";
		if (o.enable3d === true) {
			stylesheet_ani = "@-webkit-keyframes spin3d {0%    { -webkit-transform: rotateY(0deg); }50%   { -webkit-transform: rotateY(180deg) perspective("+o.perspective+"); }100%  { -webkit-transform: rotateY(360deg); }}";
			stylesheet_class = "."+o.stylesheets.cls_name+" {-webkit-animation: spin3d "+o.duration+"ms "+o.spins+" "+o.easing+";-webkit-transform-style: preserve-3d;}";
		}
		Ext.util.CSS.createStyleSheet(stylesheet_ani, o.stylesheets.ani);
		Ext.util.CSS.createStyleSheet(stylesheet_class, o.stylesheets.cls);
		this.addClass(o.stylesheets.cls_name);
		
		if (o.spins != "infinite") {
			new Ext.util.DelayedTask(function() {
				Ext.util.CSS.removeStyleSheet(o.stylesheets.ani);
				Ext.util.CSS.removeStyleSheet(o.stylesheets.cls);
				this.removeClass(o.stylesheets.cls_name);
			}, this).delay(o.duration+150);
		}
		
		return this;
	},
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
	        duration: 250,
	        easing: "linear"
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
	        easing: "linear",
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
	        easing: "linear",
	        remove: false
	    });
		if (o.direction === null) {
			o.direction = (this.getStyle("opacity") == 0) ? 1 : 0;
		}
		this.setStyle({
			"-webkit-transform": "scale("+o.direction+")",
			"-webkit-transition-timing-function": o.easing,
			"-webkit-transition-duration": o.duration+"ms",
			"opacity": o.direction
		});
		this.afterFx(o, this);
		return this;
	},
	CSS3FlipOut: function(o) {
		o = Ext.applyIf(o || {}, {
	        duration: 2000,
	        direction: null,
	        perspective: 900,
	        easing: "linear",
	        remove: false,
	        stylesheets: {}
	    });
		o.stylesheets.ani = Ext.id();
		o.stylesheets.cls = Ext.id();
		o.stylesheets.cls_name = this.id+"_flipFx";
		Ext.util.CSS.createStyleSheet("@-webkit-keyframes flipDown {0%    {-webkit-transform: rotateX(0deg);opacity:1;}99%  {-webkit-transform: rotateX(90deg) perspective("+o.perspective+");opacity:1;}100%  {opacity: 0;}}", o.stylesheets.ani);
		Ext.util.CSS.createStyleSheet("."+o.stylesheets.cls_name+" {-webkit-animation: flipDown "+o.duration+"ms "+o.easing+";-webkit-transform-style: preserve-3d;-webkit-transform-origin: bottom center;}", o.stylesheets.cls);
		this.addClass(o.stylesheets.cls_name);
		new Ext.util.DelayedTask(function() {
			this.setStyle("opacity", 0);
			Ext.util.CSS.removeStyleSheet(o.stylesheets.ani);
			Ext.util.CSS.removeStyleSheet(o.stylesheets.cls);
			this.removeClass(o.stylesheets.cls_name);
		}, this).delay(o.duration+15);
		this.afterFx(o, this);
		return this;
	},
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