var nodeMailer=require('nodemailer');
var transport=nodeMailer.createTransport({
    host:'smtp.gmail.com',//simple mail transfer protocol (smtp)? smtp is used to send and receive email
    port:587,
    secure:false,
    requireTLS:true,//TLS is a way to provide secure connections between a client and a server
    auth:
    {
        user:'mansikoranga000@gmail.com',
        pass:'vqio ohfs zkwa knui'
    }


});
var mailOption={
    from:'mansikoranga000@gmail.com',
    to:'jamalkhatri9@gmail.com',
    subject:'node mail',
    text:"hello node"
}
transport.sendMail(mailOption,function(error,info)
{
    if (error)
    {
        console.warn(error);
    }
    else{
        console.warn('email has been send',info.response);

    }
})