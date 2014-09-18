
Messages = new Meteor.Collection('Messages');

if(Meteor.isClient) {
	Template.messages.created = function () {
		this.sub = Meteor.subscribe('messages');
	}

	Template.messages.helpers({
		messages: function () {
			return Messages.find({});
		}
	});


	Template.message.rendered = function () {
		this.input = this.find('[contenteditable=true]');

		this.autorun((function(self) {
			return function() {
				self.input.innerText = (Messages.findOne(self.data._id) || {}).body;
			};
		})(this));
	}

	Template.message.events({
		'click [action=edit]': function (event, tmpl) {
			event.preventDefault();
			Messages.update(tmpl.data._id, {$set: {body: tmpl.input.innerText}})
		}
	})

	Template.newMessage.rendered = function () {
		this.input = this.firstNode
	}	

	Template.newMessage.events({
		'click [action=send]': function (event, tmpl) {
			event.preventDefault();
			Messages.insert({body: tmpl.input.innerText});
			tmpl.input.innerText = '';
		}
	})
}

if(Meteor.isServer) {
	Meteor.publish('messages', function () {
		return Messages.find({})
	})
}