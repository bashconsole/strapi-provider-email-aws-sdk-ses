'use strict';

/**
 * Module dependencies
 */

// Public node modules.
const _ = require('lodash');
const aws = require('aws-sdk');

/* eslint-disable no-unused-vars */
module.exports = {
  provider: 'aws-ses',
  name: 'AWS SES',
  auth: {
    aws_ses_default_from: {
      label: 'AWS SES Default From',
      type: 'text'
    },
    aws_ses_default_replyto: {
      label: 'AWS SES Default Reply-To',
      type: 'text'
    },
    aws_ses_access_key_id: {
      label: 'AWS Access Key ID',
      type: 'text'
    },
    aws_ses_secret_access_key: {
      label: 'AWS Secret Access Key',
      type: 'text'
    },
    aws_ses_region: {
      label: 'AWS Region',
      type: 'text'
    },
    aws_ses_configuration_set: {
      label: 'AWS SES Configuration Set',
      type: 'text'
    }
  },
  init: (config) => {
    return {
      send: (options, cb) => {
        return new Promise((resolve, reject) => {
          // Default values.
          options = _.isObject(options) ? options : {};
          options.from = options.from || config.aws_ses_default_from;
          options.replyTo = options.replyTo || config.aws_ses_default_replyto;
          options.text = options.text || options.html;
          options.html = options.html || options.text;
          options.charset = options.charset || "UTF-8";

          aws.config.update({
            accessKeyId: config.aws_ses_access_key_id,
            secretAccessKey: config.aws_ses_secret_access_key,
            region: config.aws_ses_region || "us-east-1"
          });

          // Create a new SES object.
          var ses = new aws.SES();

          var params = {
            Source: options.from,
            Destination: {
              ToAddresses: [
                options.to
              ],
            },
            Message: {
              Subject: {
                Data: options.subject,
                Charset: options.charset
              },
              Body: {
                Text: {
                  Data: options.text,
                  Charset: options.charset
                },
                Html: {
                  Data: options.html,
                  Charset: options.charset
                }
              }
            }
          };

          if(config.aws_ses_configuration_set !== "none"){
              params = {...params, ...{ConfigurationSetName: config.aws_ses_configuration_set}};
          }

          //Try to send the email.
          ses.sendEmail(params, function(err, data) {
            if (err) {
              reject([{ messages: [{ id: 'Auth.form.error.email.invalid' }] }]);
            } else {
              resolve();
            }
          });
        });
      }
    };
  }
};
