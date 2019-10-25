# strapi-provider-email-aws-sdk-ses

Amazon Simple Email Service provider based on AWS SDK for Strapi Email Plugin.



## Benefits

 - You can send emails from your Amazon Simple Email Service external provider
 - Uses official AWS SDK for JavaScript http://aws.amazon.com/javascript


## Installation

`npm install strapi-provider-email-aws-sdk-ses`


## Programmatic usage


```javascript
'use strict';

/**
 * `Emails` service.
 */


module.exports = {
  send: async () => {

    const options = {
      to: 'somebody@example.com',
      from: 'sender@example.com',
      replyTo: 'no-reply@example.com',
      subject: 'Use strapi email provider successfully',
      text: 'Hello world!',
      html: 'Hello world!',
    };

    // Retrieve provider configuration.
    const config = await strapi.store({
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'email'
    }).get({ key: 'provider' });

    // Verify if the file email is enable.
    if (config.enabled === false) {
      strapi.log.error('Email is disabled');
      return false;
    }

    return await strapi.plugins.email.services.email.send(options, config);
  }

};
```

## Configure the plugin

- Open Strapi admin panel
- Click on Plugins in the left menu
- Click on the cog button on the Email plugin line
- Create Amazon SES username (if you did not do that yet https://docs.aws.amazon.com/ses/latest/DeveloperGuide/sign-up-for-aws.html)
  - AWS SES Default Reply-To - default reply-to email address
  - AWS Access Key ID - your AWS SES Access Key ID (https://docs.aws.amazon.com/ses/latest/DeveloperGuide/get-aws-keys.html)
  - AWS Secret Access Key - your AWS SES Access Key (https://docs.aws.amazon.com/ses/latest/DeveloperGuide/get-aws-keys.html)
  - AWS Region (set default to "us-east-1")
  - AWS SES Configuration Set - AWS SES Configuration Set name (set default to "none" if not required, https://docs.aws.amazon.com/ses/latest/DeveloperGuide/event-publishing-create-configuration-set.html)


## Resources

- [MIT License](LICENSE.md)

## Links

- [Package homepage] (https://github.com/bashconsole/strapi-provider-email-aws-sdk-ses)
- [Strapi website](http://strapi.io/)
