"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterCreate(result) {
      await strapi.plugins["email"].services.email.send({
        to: result["email"],
        from: "contact@dlbam.org",
        bcc: "contact@dlbam.org",
        replyTo: "contact@dlbam.org",
        subject: "Votre inscription a bien été prise en compte !",
        html: formatEmail(result),
      });
    },
  },
};

function formatEmail(result) {
  const {
    firstname,
    lastname,
    phone,
    email,
    classType,
    classes,
    membership,
  } = result;

  classes.sort((c1, c2) => c1.id - c2.id);

  return `<p>Bonjour ${firstname},</p>

  <p>Merci d'avoir rempli le formulaire d'inscription pour ${
    classType.title
  } !<br />
  Nous allons rapidement revenir vers vous pour vous confirmer l'inscription et vous indiquer comment payer.</p>

  <p>L'équipe de Mars Blues Dancers.</p>

  <hr />

  <p>Prénom : ${firstname}</p>
  <p>Nom : ${lastname}</p>
  <p>Téléphone : ${phone}</p>
  <p>Courriel : ${email}</p>

  <p>Vous vous êtes inscrit.e pour :</p>
  <ul>
  ${
    classes.length === 5
      ? "<li>Toutes les sessions, du 9 sep. au 23 juin (34 x 1h30), 250€</li>"
      : classes
          .map(
            ({ title, description, price }) =>
              `<li>${title}, ${firstLineOfDescription(
                description
              )}, ${price}€</li>`
          )
          .join("")
  }
  </ul>

  <p>${
    membership === "new"
      ? "Vous allez aussi adhérer à Mars Blues Dancers (5€)."
      : "Vous êtes déjà adhérent.e à Mars Blues Dancers."
  }</p>
  `;
}

function firstLineOfDescription(description) {
  const firstLine = description.split("\n")[0];
  const normalizedFirstLine = firstLine.replace(/\*/g, "");
  return (
    normalizedFirstLine.slice(0, 1).toLocaleLowerCase() +
    normalizedFirstLine.slice(1)
  );
}
