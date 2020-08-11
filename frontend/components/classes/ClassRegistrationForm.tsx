import React from "react"
import styled from "styled-components"

import { useClassTypeContext } from "../../pages/classes/[slug]"
import { breakpoints } from "../theme"

const Form = styled.form`
  border: dotted 3px ${(props) => props.theme.colors.o2};
  border-radius: 8px;
  padding: 16px;

  margin: 24px 0;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  column-gap: 16px;

  @media (min-width: ${breakpoints.small}px) {
    & > .full-row {
      grid-column-end: span 2;
    }
  }
`

const ClassRegistrationForm: React.FC = () => {
  const { slug, classes } = useClassTypeContext()

  return (
    <Form>
      <div className="mui-textfield mui-textfield--float-label">
        <input type="text" name="firstname" />
        <label>Prénom</label>
      </div>
      <div className="mui-textfield mui-textfield--float-label">
        <input type="text" name="lastname" />
        <label>Nom</label>
      </div>
      <div className="mui-textfield mui-textfield--float-label">
        <input type="text" name="phone" />
        <label>Numéro de téléphone</label>
      </div>
      <div className="mui-textfield mui-textfield--float-label">
        <input type="text" name="email" />
        <label>Courriel</label>
      </div>
      <div className="full-row">
        <h3>Selectionnez les cours souhaités :</h3>
        {classes.map(({ id, title }) => (
          <div key={id} className="mui-checkbox">
            <label>
              <input type="checkbox" name={`${slug}-${id.toString()}`} />
              {title}
            </label>
          </div>
        ))}
      </div>
      <div className="full-row">
        <h3>Adhésion à Mars Blues Dancers ou au CIAM :</h3>
        <p>Pour suivre les cours, vous devez être adhérent.e de Mars Blues Dancers ou du CIAM.</p>
      </div>
      <div className="mui-radio">
        <label>
          <input type="radio" name="membership-dlbam" />
          J'adhére à l'association (5€)
        </label>
      </div>
      <div className="mui-radio">
        <label>
          <input type="radio" name="membership-dlbam-done" />
          Je suis déjà adhérent de l'association
        </label>
      </div>
      <div className="mui-radio">
        <label>
          <input type="radio" name="membership-ciam" />
          J'adhére au CIAM (20€)
        </label>
      </div>
      <div className="mui-radio">
        <label>
          <input type="radio" name="membership-ciam-done" />
          Je suis déjà adhérent du CIAM
        </label>
      </div>
      <button type="submit" className="mui-btn mui-btn--primary full-row">
        C'est parti !
      </button>
    </Form>
  )
}

export default ClassRegistrationForm
