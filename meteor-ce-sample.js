
Messages = new Meteor.Collection('Messages');

if(Meteor.isClient) {
	Template.viewsWrapperWithIf.created = function () {
		this.wrapperCounter = new Blaze.ReactiveVar(1);
	}

	Template.viewsWrapperWithIf.viewCountIs = function (num) {
		return num == UI._templateInstance().wrapperCounter.get()
	}

	Template.viewsWrapperWithIf.events({
		'click *': function (event, tmpl) {
			event.preventDefault();
			event.stopImmediatePropagation();
			var next = (tmpl.wrapperCounter.get() || 1) + 1;
			tmpl.wrapperCounter.set(next > 6 ? 1 : next)
		}
	})


	Template.viewsWrapperWithUIDynamic.created = function () {
		Session.set('wrapperCounter', 1)
	}

	Template.viewsWrapperWithUIDynamic.viewCountName = function () {
		return 'view' + Session.get('wrapperCounter');
	}

	Template.viewsWrapperWithUIDynamic.events({
		'click *': function (event, tmpl) {
			event.preventDefault();
			event.stopImmediatePropagation();
			var next = (Session.get('wrapperCounter') || 1) + 1;
			Session.set('wrapperCounter', next > 6 ? 1 : next)
		}
	})
}