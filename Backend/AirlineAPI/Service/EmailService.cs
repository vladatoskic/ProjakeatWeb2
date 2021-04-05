using Microsoft.Extensions.Options;
using System;
using System.Diagnostics;
using System.Net;
using System.Net.Mail;
using System.Security;
using System.Threading.Tasks;
using Core.Interfaces.Services;

namespace Core.Services
{
    public class EmailService:IEmailService
    {
  
        public async Task SendMailAsync(string to, string subject, string body, string from = "noreply@gmail.com")
        {
            using (SmtpClient smtpClient = new SmtpClient())
            {
                var basicCredential = new NetworkCredential(NetworkCredentialUsername, NetworkCredentialPassword);
                using (MailMessage message = new MailMessage())
                {
                    MailAddress fromAddress = new MailAddress(from, from);
                    smtpClient.EnableSsl = true;
                    smtpClient.Host = SmtpClientHost;
                    smtpClient.UseDefaultCredentials = false;
                    smtpClient.Credentials = basicCredential;
                    smtpClient.Port = SmtpClientPort;

                    message.From = fromAddress;
                    message.Subject = subject;
                    message.IsBodyHtml = true;
                    message.Body = body;
                    message.To.Add(to);

                    try
                    {
                        await smtpClient.SendMailAsync(message);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.StackTrace);
                        Trace.TraceError(ex.Message);
                    }
                }
            }
        }


        public string NetworkCredentialPassword { get; set; } = "cloverweb";

        public string NetworkCredentialUsername { get; set; } = "clover.web21@gmail.com";

        public string SmtpClientHost { get; set; } = "smtp.gmail.com";
            
        public int SmtpClientPort { get; set; } = 587;
    }
}