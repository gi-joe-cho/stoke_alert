import React from 'react';
import { Button, TextArea, Form, Modal, Icon, Popup, Select } from 'semantic-ui-react';

import TabBar from '../TabBar/TabBar';
import { states } from '../../utils/states';
import { months } from '../../utils/month';
import { dates } from '../../utils/dates';
import { years } from '../../utils/year';

const ModalModalExample = (
  { 
    first_name, 
    last_name,
    username, 
    retype_password,
    password, 
    email,
    month,
    date,
    year,
    city,
    state,
    zipcode,
    about,
    submittedName,
    submittedEmail, 
    handleChange, 
    handleSubmit,
    modalOpen,
    closeModal,
    closeConfig,
    newClose,
    firstNameValidation,
    lastNameValidation,
    zipcodeValidation,
    cityValidation,
    stateValidation,
    usernameValidation,
    passwordValidation,
    monthValidation,
    dateValidation,
    yearValidation,
    emailValidation,
    passwordMatch,
    cityZipStateValidation
  }
) => (
    <Modal trigger={<Button onClick={closeConfig} id="login">
                    <Popup trigger={<Icon name="user circle" />} content='Sign-in to your account' />
                  </Button>}
          size='small'
          open={modalOpen}
          closeOnDimmerClick={false}
  >
      <Modal.Header><TabBar closeModal={closeModal}/></Modal.Header>
    <Modal.Content>
      <Form onSubmit={handleSubmit} widths='equal'>
        <Form.Group unstackable widths={6}>
          <Form.Input label='First name' placeholder='First name' name='first_name' value={first_name} onChange={handleChange} error={!firstNameValidation} />
            <Form.Input label='Last name' placeholder='Last name' name='last_name' value={last_name} onChange={handleChange} error={!lastNameValidation} />
        </Form.Group>
        <Form.Group >
            <Form.Input label='Username' placeholder='Username' width='2'  name='username' value={username} onChange={handleChange} error={!usernameValidation} />
            <Form.Input label='Password' type='Password' width='4' name='password' value={password} onChange={handleChange} error={!passwordValidation} />
          <Form.Input label='Re-type Password'  type='Password' name='retype_password' value={retype_password} onChange={handleChange}  width='4' error={!passwordMatch} />
        </Form.Group>
        <Form.Group>
            <Form.Input label='Email' placeholder='Email' width='4' name='email' value={email} onChange={handleChange} error={!emailValidation} />
          <Form.Field
            compact
            control={Select} 
            options={months}
            label='Month'
            placeholder='Month'
            name='month'
            width='1'
            value={month} onChange={handleChange}
            error={!monthValidation}
          />
          <Form.Field
            compact
            control={Select} 
            options={dates}
            label='Date'
            placeholder='Date'
            width='1'
            name='date'
            value={date} onChange={handleChange}
            error={!dateValidation}
          />
            <Form.Field
              compact
              control={Select}
              options={years}
              label='Year'
              placeholder='Year'
              width='2'
              name='year'
              value={year} onChange={handleChange}
              error={!yearValidation}
            />
        </Form.Group>
        <Form.Group >
          <Form.Input label='City' placeholder='City' width='3' name='city' value={city} onChange={handleChange} error={!cityValidation && !cityZipStateValidation}/>
          <Form.Field
            control={Select} 
            options={states}
            label='State'
            placeholder='State'
            width='3'
            name='state'
            value={state} onChange={handleChange}
            error={!stateValidation && !cityZipStateValidation}
          />
          <Form.Input label='Zipcode' placeholder='XXXXX' width='2' maxLength='5' name='zipcode' value={zipcode} onChange={handleChange} error={!zipcodeValidation && !cityZipStateValidation} />
        </Form.Group>
        <Form.Field control={TextArea} label='About' placeholder='Tell us more about you...' maxLength='250' name='about' value={about} onChange={handleChange} />
        <Form.Checkbox label='I agree to the Terms and Conditions' />
      <div className="modal-ocean">
        <div className="color-div">
          <strong>onChange:</strong>
          <pre>{JSON.stringify({ first_name, email }, null, 2)}</pre>
          <strong>onSubmit:</strong>
          <pre>{JSON.stringify({ submittedName, submittedEmail }, null, 2)}</pre>
        </div>
      </div>
        <input type="submit" id="submit-form" className="hidden" />
      </Form>
    </Modal.Content>
    <Modal.Actions>
        <label className="windows-btn" htmlFor="submit-form" onClick={newClose} tabIndex="0"><span className='window-btn-span-ok'>Submit</span></label>
        <label onClick={closeModal} className="windows-btn"><span className='window-btn-span-cancel'>Cancel</span></label>
    </Modal.Actions>
  </Modal>
)

export default ModalModalExample