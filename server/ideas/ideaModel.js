/* global exports */

function Idea(title, description, authorId, eventId, tags, rolesreq) {
    "use strict";

    var now = new Date().toISOString();

    this.title = title;
    this.description = description;
    this.authorId = authorId;
    this.eventId = eventId;
    this.timeCreated = now;
    this.timeModified = now;
    this.tags = tags;
    this.rolesreq = rolesreq;
    this.likes = [];
    this.updates = [];
    this.comments = [];
    this.backs = [{
        text: "Idea Owner",
        authorId: this.authorId,
        time: new Date().toISOString(),
        types: [{name: "Owner", _lowername: "owner"}]
    }];
    this.team = [{memberId: this.authorId}];

    return this;
}

exports.create = function(title, description, authorId, eventId, tags, rolesreq) {
    "use strict";

    return new Idea(title, description, authorId, eventId, tags, rolesreq);
};
