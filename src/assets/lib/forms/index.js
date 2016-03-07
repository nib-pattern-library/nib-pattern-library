import React from 'react';
import {render} from 'react-dom';
import Form from '@nib-components/react-form';

export default class ExampleForm extends React.Component {

  constructor(...props) {
    super(props);
    this.state = {color: 'white'};
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleColorChange(event) {
    this.setState({color: event.target.value});
  }

  render() {
    return (
      <div>

        <label className="label">Color:</label>
        <Form.RadioGroup
          name="color" value={this.state.color} options={{white: 'White', grey: 'Grey', green: 'Green'}}
          onChange={this.handleColorChange}
        />

        <br/>

        <Form title="A React Form" theme={this.state.color}>

          <Form.Control valid validated name="firstName" label="What's your name" help="Please enter your first name.">
            <Form.Text/>
          </Form.Control>

          <Form.Control valid validated name="phone" label="Phone">
            <Form.Text/>
          </Form.Control>

          <Form.Control name="email" label="Email" valid={false} validated error="Not a valid email.">
            <Form.Text/>
          </Form.Control>

          <Form.Control name="state"valid={false} validated label="Where do you live?" help="Just the state is fine.">
            <Form.Select options={{nsw: 'NSW', vic: 'VIC', qld: 'QLD', other: 'Somewhere else..'}} />
          </Form.Control>

          <Form.Control valid validated name="gender" label="Are you male or female?">
            <Form.RadioGroup name="gender" options={{male: 'Male', female: 'Female'}} defaultValue="female"/>
          </Form.Control>

          <Form.Control valid validated name="mailing" label="Can we add you to all of our mailing lists?">
            <Form.Checkbox name="privacy" value="Yes" label="Yes, send me lots of emails please." />
          </Form.Control>

          <Form.Control valid validated name="extras" label="What extras do you want?">
            <Form.CheckboxGroup name="blah" options={{dental: 'Dental', physio: 'Physio', optical: 'Optical', chiro: 'Chiro', massage: 'Massage'}} defaultValue={['dental', 'optical', 'chiro']} />
          </Form.Control>

        </Form>

      </div>
    );
  }

}
if (document.querySelector('#form-example')) {
  render(
    <ExampleForm />,
    document.querySelector('#form-example')
  );
}
