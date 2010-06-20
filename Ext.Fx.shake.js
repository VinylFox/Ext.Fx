/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @contributor Nigel (Animal) White
 * <p>A 'Shake' effect for the ExtJS Fx class</p>
 */
Ext.apply(Ext.Fx, {
    /**
     * Shakes an element left to right or up and down. Shaking decreases until the element settles back into its original position.
     * Usage:
     *<pre><code>
// default: shake left to right (x) five times with an excitement level of 2
el.shake();

// custom: shake up and down 10 times with an excitement level of 4
el.shake({ direction: 'y', shakes: 10, excitement: 4 });
</code></pre>
     * @param {Object} options (optional) Object literal with any of the Shake config options (direction of 'x' or 'y', shakes, and excitement)
     * @return {Ext.Element} The Element
     */
    shake: function(o){
        o = Ext.applyIf(o || {}, {
            shakes: 5,
            excitement: 2,
            direction: 'x'
        });
        var me = this, 
            dom = me.dom, 
            c = o.direction.toUpperCase(), 
            a = Ext.fly(dom).getStyle("position") == 'absolute', 
            pos = a ? Ext.fly(dom)['get' + c]() : 0, 
            attr = (c == 'X') ? 'left' : 'top', 
            s = o.shakes, 
            r = s * 2, 
            e = o.excitement * 2, 
            sp = Ext.fly(dom).getPositioning(), 
            animArg = {}, 
            t;
        t = animArg[attr] = {
            to: 0
        };
        
        if (!a) {
            me.position();
        }
        function animFn(){
            t.to = (r & 1) ? pos - (s-- * e) : pos + (s * e);
            arguments.callee.anim = Ext.fly(dom).fxanim(animArg, o, 'motion', 0.1, 'easeNone', function(){
                if (--r > 0) {
                    me.queueFx({
                        concurrent: true
                    }, animFn);
                } else {
                    Ext.fly(dom).setPositioning(sp).afterFx(o);
                }
            });
        }
        
        me.queueFx({
            concurrent: true
        }, animFn);
        return me;
    }
});

Ext.Element.addMethods(Ext.Fx);