import React from 'react';
import { TextArea, Form, Modal, Select, Popup, Icon } from 'semantic-ui-react';
import { states } from '../../utils/states';
import { months } from '../../utils/month';
import { dates } from '../../utils/dates';
import { years } from '../../utils/year';

import TabBar from '../TabBar/TabBar';
import SignUpButton from '../Shared/SignUpButton'

const ModalSignUp = (
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
    upModalOpen,
    upClose,
    upCloseConfig,
    newClose,
    signBothClose,
    validations,
  }
) => (
    <Modal
      trigger={<SignUpButton closeConfig={upCloseConfig}/>}
      size='small'
      open={upModalOpen}
      closeOnDimmerClick={false}
    >
      <Modal.Header><TabBar tabMessage={'S i g n_U p . e x e'} closeModal={signBothClose}/></Modal.Header>
    <Modal.Content>
      <Form onSubmit={handleSubmit} widths='equal'>
        <Form.Group unstackable widths={6}>
          <Form.Input label='First name' placeholder='First name' name='first_name' value={first_name} onChange={handleChange} error={!validations.first_name} />
          <Form.Input label='Last name' placeholder='Last name' name='last_name' value={last_name} onChange={handleChange} error={!validations.last_name} />
        </Form.Group>
        <Form.Group >
          <Form.Input label='Username' placeholder='Username' width='2'  name='username' value={username} onChange={handleChange} error={!validations.username} />
          <Form.Input label='Password' type='Password' width='4' name='password' value={password} onChange={handleChange} error={!validations.password} />
          <Form.Input label='Re-type Password'  type='Password' name='retype_password' value={retype_password} onChange={handleChange}  width='4' error={!validations.retype_password} />
        </Form.Group>
        <Form.Group>
          <Form.Input label='Email' placeholder='Email' width='4' name='email' value={email} onChange={handleChange} error={!validations.email} />
          <Form.Field
            compact
            control={Select} 
            options={months}
            label='Month'
            placeholder='Month'
            name='month'
            width='1'
            value={month} 
            onChange={handleChange}
            error={!validations.month}
          />
          <Form.Field
            compact
            control={Select} 
            options={dates}
            label='Date'
            placeholder='Date'
            width='1'
            name='date'
            value={date} 
            onChange={handleChange}
            error={!validations.date}
          />
          <Form.Field
            compact
            control={Select}
            options={years}
            label='Year'
            placeholder='Year'
            width='2'
            name='year'
            value={year} 
            onChange={handleChange}
            error={!validations.year}
          />
        </Form.Group>
        <Form.Group >
          <Form.Input label='City' placeholder='City' width='3' name='city' value={city} onChange={handleChange} error={!validations.city && !validations.city_zip_state}/>
          <Form.Field
            control={Select} 
            options={states}
            label='State'
            placeholder='State'
            width='3'
            name='state'
            value={state} 
            onChange={handleChange}
            error={!validations.state && !validations.city_zip_state}
          />
          <Form.Input label='Zipcode' placeholder='XXXXX' width='2' maxLength='5' name='zipcode' value={zipcode} onChange={handleChange} error={!validations.zipcode && !validations.city_zip_state} />
        </Form.Group>
        <Form.Field control={TextArea} label='About' placeholder='Tell us more about you...' maxLength='250' name='annotation' value={about} onChange={handleChange} />
        <Form.Checkbox label='I agree to the Terms and Conditions' />
        <div className="modal-ocean">
          {/* modal aesthetic undergoing css calibration */}
            {/* <div className="color-div"> */}
              <strong>onChange:</strong>
              <pre>{JSON.stringify({ first_name, email }, null, 2)}</pre>
              <strong>onSubmit:</strong>
              <pre>{JSON.stringify({ submittedName, submittedEmail }, null, 2)}</pre>
              <input type="submit" id="submit-form" className="hidden" />
          {/* </div> */}
        </div>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <label className="windows-btn-sign" onClick={upClose}><span className='window-btn-span-sign'>Sign In</span><Popup trigger={<Icon name="sign-in" />} content='Sign-in to your account' /></label>
      <label className="windows-btn" htmlFor="submit-form" onClick={newClose} tabIndex="0"><span className='window-btn-span-ok'>Submit</span></label>
      <label onClick={signBothClose} className="windows-btn"><span className='window-btn-span-cancel'>Cancel</span></label>
    </Modal.Actions>
  </Modal>
)

export default ModalSignUp