// Contact Api
'use strict'
const component = "CONTACT";
var model = require('../models/Contacts');
const async = require('async');
var uuid = require('uuid/v1');


var find = {
    /**
     * find all roles
     * @async
     */
    all: function(cb) {
        const log = require('../util/logger').log(component, __filename);
        log.debug(component, 'searching for all contacts');
        model.find({})
        .then( contacts => {
            log.debug(component, `retrieved ${contacts.length} contacts`);
            log.close();
            return cb(null, contacts);
        })
        .catch( err => {
            log.error(component, 'find all contacts error', { attach: err });
            log.close();
            return cb(err);
        })
    },
    by: {

        id: function (id, cb) {
            const log = require('../util/logger').log(component, __filename);
            log.debug(component, 'searching for contact form by Id', { attach: id });
            var query = { 'contactId': id };
            log.debug(component, 'search criteria', { attach: query });
            model.findOne(query)
                .then(contact => {
                    var ret ;
                    if (contact ==null || contact == 'undefined') {
                        log.debug(component, `no contact found ${id}`);
                    }
                    else{
                    
                        ret = contact;
                        log.debug(component, `contact found`);
                        log.trace(component, 'contact found');
                        log.close();

                    }
                    return cb(null, ret);
                })
                .catch(err => {
                    log.error(component, 'find by contact Id error', { attach: err });
                    log.close();
                    return cb(err);
                })
        }
    }

}

var uid = function uid() {
    return uuid().replace(/\-/g, '');
}

var create = function (data, cb) {
    // setup
    const log = require('../util/logger').log(component, __filename);

    log.debug(component, 'contact form data', { attachInline: data });

     var contactData = data;
     contactData.contactId = this.uid();
    
    var contactModel = new model(contactData);
    contactModel.save()
        .then(contact => {
            log.debug(component, 'new contact Form created:', { attachInline: contact });
            log.close();
            return cb(null,contact);
        })
        .catch(err => {
            log.error(component, 'create contact form error', { attach: err });
            log.close();
            return cb(err);
        });
};

var update = function(data, cb) {
    model.findOneAndUpdate({ contactId: data.contactId }, data,  {new: true},(err, transcriptBatch) => {
        if (err) {
            return cb(err, null);
        } else {
            return cb(null, transcriptBatch);
        }
    });
};  

var remove = function (contactId, cb) {
    // setup
    const log = require('../util/logger').log(component, __filename);
    log.debug(component, 'removing user', { attach: contactId });
    var query = { 'contactId': contactId };
    model.deleteOne(query)
        .then(response => {
            log.debug(component, 'contact removed', { attach: response.result });
            log.close();
            return cb(null);
        })
        .catch(err => {
            log.error(component, 'contact user error', { attach: err });
            log.close();
            return cb(err);
        });
};



module.exports = {
    find: find,
    create:create,
    uid: uid,
    remove:remove,
    update:update
};
