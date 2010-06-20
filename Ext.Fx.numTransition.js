/**
 * @author Abdul Rehman Talat
 * <p>A number transition effect for the ExtJS Fx class.</p>
 */
Ext.apply(Ext.Fx, (function(){

	function changeNumber(number){
		this.dom.innerHTML = number;
	}

    function getNumArr(start, end, transitions)
	{
		var size = (end-start)/transitions;
		//console.log("size: " + size)
		var arr = []
		
		for(var i=0; i<transitions; i++)
		{
			arr[i] = parseInt(start + ((i+1)*size));
		}
		
		//console.log(arr);
		
		return arr;
	}

    return {
        /**
         * Animates a change from one number to another.
         * Usage:
         *<pre><code>
// default: Increments the number 5 times, per increment every 1/10th of a second.
el.numTransition();

// custom: Increments the number 10 times, per increment every 1/10th of a second.
el.numTransition({transitions: 10});

// custom: Increments the number 10 times, per increment every 1/100th of a second.
el.numTransition({interval: .1, transitions: 10});
</code></pre>
         * @param {Number} newNumber The new number that will replace the current number in the element.
		 * @param {Object} options (optional) Object literal with any of the numTransition config options (interval, transitions)
         * @return {Ext.Element} The Element
         */
        numTransition: function(newNumber, o) {
            o = o || {};
            var me = this,
                interval = (o.interval * 100) || 100,
				transitions = o.transitions || 5,
                number = parseFloat(this.dom.innerHTML),
				arr = getNumArr(number, newNumber, transitions),
                afterFn = function() {
                    me.afterFx(o);
                }
                
            for (i = 0; i < transitions; i++) {					
				changeNumber.defer(i*interval, this, [arr[i]]);
			}
            return me;
        }
    }
})());

Ext.Element.addMethods(Ext.Fx);