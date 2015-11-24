import React from 'react';
import {render} from 'react-dom';
import Form from '@nib-components/react-form';
import validate from './validate.js';

export default class ExampleForm extends React.Component {

  render() {
    return (
      <div>

        <Form title="A React Form" theme="green">

          <Form.Control valid validated label="What's your name" help="Please enter your first name.">
            <Form.Text/>
          </Form.Control>

          <Form.Control valid validated label="Phone">
            <Form.Text/>
          </Form.Control>

          <Form.Control label="Email" valid={false} validated error="Not a valid email.">
            <Form.Text/>
          </Form.Control>

          <Form.Control valid={false} validated label="Where do you live?" help="Just the state is fine.">
            <Form.Select options={{nsw: "NSW", vic: "VIC", qld: "QLD", other: "Somewhere else.."}} />
          </Form.Control>

          <Form.Control valid validated label="Are you male or female?">
            <Form.RadioGroup name="gender" options={{male: 'Male', female: 'Female'}} defaultValue="female" onChange={event => console.log('change' ,event.target.value)} onBlur={event => console.log('blur', event.target.value)}/>
          </Form.Control>

          <Form.Control valid validated label="Can we add you to all of our mailing lists?">
            <Form.Checkbox name="privacy" value="Yes" label="Yes, send me lots of emails please." />
          </Form.Control>

          <Form.Control valid validated label="What extras do you want?">
            <Form.CheckboxGroup name="blah" options={{dental: 'Dental', physio: 'Physio', optical: "Optical", chiro: "Chiro", massage: "Massage"}} defaultValue={['dental', 'optical', 'chiro']} />
          </Form.Control>

        </Form>

      </div>
    )
  }

}

render(
  <ExampleForm />,
  document.querySelector('#form-example')
);