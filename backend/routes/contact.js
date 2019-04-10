/**
 * University routes
 */
'use strict'
const component = "ROUTER";
const router = require('express').Router();
const contactapi = require('../api/contactApi');
const ERR = require('../errors.json');
const log = require('../util/logger').log(component, __filename);

router
    .get('/', (req, res) => {
        // setup
        log.debug(component, 'searching for all contact');

        contactapi.find.all(function (err, contacts) {
            if (err) {
                log.error(component, 'find all contact error', { attach: err });
                log.close();
                return res.json({ err: Object.assign(ERR.UNKNOWN, { message: err.message }) });
            }
            else{
                if(contacts.length == 0) {
                    return res.json({
                        "response":"success",
                        "message": ERR.NO_SUCH_ID
                    })
                } else {
                    return res.json({
                        "response":"success",
                        data:contacts
                    })
                }
            }
        });
    })
    .post('/', (req, res) => {
        // setup
        log.debug(component, 'creating new contact');

        // extract
        var contact = req.body;

        contactapi.create(contact, (err, newContact) => {
            if (err) {
                log.error(component, 'create new contact error', { attach: err });
                log.close();
                res.json({ err: err.message });
            } else {
                
                log.debug(component, 'new contact created');
                log.trace(component, 'contact:', { attach: contact });
                log.close();
                return res.json({
                    message:"success",
                    data: contact
                });
            }
        });
    })
    .get('/:contactId', (req, res) => {
        contactapi.find.by.id(req.params.contactId, function (err, contact) {
            if (err) {
                log.error(component, 'find contact by id error', { attach: err });
                log.close();
                return res.json({ err: Object.assign(ERR.UNKNOWN, { message: err.message }) });
            } else {
                if(!contact) {
                    log.debug(component, 'no contact found', { attachInline: ERR.NO_SUCH_ID });
                    log.close();
                    res.json({ err: ERR.NO_SUCH_ID });
                }
                else{
                    log.debug(component, 'contact found:', { attach: contact });
                    log.close();
                    return res.json({
                     data: contact
                    });
                }
            }
        });
    })
    .put('/:contactId', (req, res) => {
        var contactData = req.body;
        contactData.contactId = req.params.contactId;
        log.debug(component, 'updating contact', { attach: contactData.contactId });
        log.trace(component, 'contact data:', { attach: contactData });

        contactapi.find.by.id(req.params.contactId, function (err, contact) {
            if (err) {
                log.error(component, 'find contact by id error', { attach: err });
                log.close();
                return res.json({ err: Object.assign(ERR.UNKNOWN, { message: err.message }) });
            } 
            else {
                if(!contact) {
                    log.debug(component, 'no contact found', { attachInline: ERR.NO_SUCH_ID });
                    log.close();
                    res.json({ err: ERR.NO_SUCH_ID });
                }
                else{
                    contactapi.update(contactData, function (err, contact) {
                        if (err) {
                            log.error(component, 'update contact error', { attach: err });
                            log.close();
                            return res.json({ err: Object.assign(ERR.UNKNOWN, { message: err.message }) });
                        } else {
                            log.debug(component, 'contact updated');
                            log.trace(component, 'contact:', { attach: contact });
                            log.close();
                            return res.json({
                                message: "contact updated"
                            });
                        }
                    });
                }
            }
        });

    })
    .delete('/:contactId', (req,res) => {
        log.debug(component, 'deleting Contact', { attach: req.params.contactId });
        // delete
        contactapi.find.by.id(req.params.contactId, function (err, contact) {
            if (err) {
                log.error(component, 'find Contact by id error', { attach: err });
                log.close();
                return res.json({ err: Object.assign(ERR.UNKNOWN, { message: err.message }) });
            } else {
                if (!contact) {
                    log.debug(component, 'no Contact found', { attachInline: ERR.NO_SUCH_ID });
                    log.close();
                    res.json({ err: ERR.NO_SUCH_ID });
                }
                else {
                    contactapi.remove(req.params.contactId, function (err, contact) {
                        if (err) {
                            log.error(component, 'delete contact error', { attach: err });
                            log.close();
                            return res.json({ err: Object.assign(ERR.UNKNOWN, { message: err.message }) });
                        } else {
                            log.debug(component, 'contact deleted');
                            log.close();
                            return res.json({ "status": "Success", "message": "Contact Deleted Successfully" }).end();
                        }
                    });
                }
            }
        });
    })


module.exports = router;
