import React, { Component } from 'react';
import { Menu, Button, Icon, Popup } from 'semantic-ui-react';

import { validateName, validateZip, validateZipcode, validateUsername, validatePassword, validateRetype, validateEmail } from '../../utils/validations';
import ModalSignIn from '../../components/Signin/Signin';
import ModalSignUp from '../../components/Signup/Signup';
import { withRouter } from 'react-router-dom';

class MenuExampleTabularOnTop extends Component {
  state = { 
    first_name: '',
    last_name: '', 
    username: '',
    usernameSignIn: '',
    email: '',
    password: '',
    passwordSignIn: '',
    retype_password:'',
    year: '',
    month: '',
    date: '',
    birth_date: '',
    city: '',
    state: '',
    zipcode: '',
    annotation: '',
    created_at: '',
    updated_at: '', 
    submittedName: '', 
    submittedEmail: '',
    valid_city: '',
    signInModalOpen: false,
    signUpModalOpen: false,
    submitClick:false,
    validations: {
      first_name: true,
      email: true,
      password: true,
      retype_password: true,
      last_name: true,
      username: true,
      errorSignIn: true,
      state: true,
      city: true,
      zipcode: true,
      city_zip_state: true,
      month: true,
      date: true,
      year: true,
      currentUser: ''
    }
  }

  isTokenAvailable = () => {
    const token = localStorage.getItem('token');
    if (token === null || token === 'undefined') {
      return false;
    }
    return true;
  }

  signInCloseConfig = () => {
    this.setState({ signInModalOpen: true });
  }

  signUpCloseConfig = () => {
    this.setState({ signUpModalOpen: true });
  }

  signUpClose = () => this.setState({ signUpModalOpen: false, signInModalOpen: true });

  signInClose = () => this.setState({ signUpModalOpen: true, signInModalOpen: false });

  signBothClose = () => this.setState({ signUpModalOpen: false, signInModalOpen: false });

  handleItemClick = (e, { name }) => {
    if(name !== 'home'){
      this.props.history.push('/' + name);
    } else {
      this.props.history.push('/home');
      window.location.reload();
    }
  };

  handleChange = (e, { name, value }) => {
    this.setState(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });        
  } 

  handleSubmit = () => {
    const { name, email } = this.state;
    this.setState({ submittedName: name, submittedEmail: email });
  }

  changeValidation = (name, value) => {
    this.setState(prevState => ({
      ...prevState,
      validations: { ...prevState.validations, [name]: value },
    }));
  };

  validateCityZipState = async () => {
    if (this.state.city.length > 0 && this.state.state.length > 0 && this.state.zipcode.length > 0 ){
      const response = await validateZip(this.state.zipcode);
      if (this.state.city.toLowerCase() === response.city.toLowerCase() && this.state.state === response.stateAbbreviation) {
        this.changeValidation('city_zip_state', true);
        return true;
      } else {
        this.changeValidation('city_zip_state', false);
        if(this.state.city.toLowerCase() !== response.city.toLowerCase()) {
          this.changeValidation('city', false);
        } else if (this.state.state !== response.stateAbbreviation) {
          this.changeValidation('state', false);
        }
        // if CITY ZIPCODE AND STATE DO NOT MATCH!!! flash will go here 
        return false;
      }
    } else {
      return false;
    }
  }

  checkAllInputValidations = async () => {
    const { first_name, email, password, retype_password, last_name, username, zipcode, city, state, month, date, year } = this.state;
    let submitChanges = true;
        
    if (!validateName(first_name)) {
      this.changeValidation('first_name', false);
      submitChanges = false;
    } else {
      this.changeValidation('first_name', true);
    }

    if (!validateName(last_name)) {
      this.changeValidation('last_name', false);
      submitChanges = false;
    } else {
      this.changeValidation('last_name', true);
    }

    if (!validateUsername(username)) {
      this.changeValidation('username', false);
      submitChanges = false;
    } else {
      this.changeValidation('username', true);
    }

    if (!validateZipcode(zipcode)) {
      this.changeValidation('zipcode', false);
      submitChanges = false;
    } else {
      this.changeValidation('zipcode', true);
    }

    if (!validateName(city)) {
      this.changeValidation('city', false);
      submitChanges = false;
    } else {
      this.changeValidation('city', true);
    }

    if (!validateName(state)) {
      this.changeValidation('state', false);
      submitChanges = false;
    } else {
      this.changeValidation('state', true);
    }

    if (!validatePassword(password, retype_password)) {
      this.changeValidation('password', false);
      submitChanges = false;
    } else {
      this.changeValidation('password', true);
    }

    if (!validateRetype(password, retype_password)) {
      this.changeValidation('retype_password', false);
      submitChanges = false;
    } else {
      this.changeValidation('retype_password', true);
    }

    if (!validateName(month)) {
      this.changeValidation('month', false);
      submitChanges = false;
    } else {
      this.changeValidation('month', true);
    }

    if (!validateName(date)) {
      this.changeValidation('date', false);
      submitChanges = false;
    } else {
      this.changeValidation('date', true);
    }

    if (!validateName(year)) {
      this.changeValidation('year', false);
      submitChanges = false;
    } else {
      this.changeValidation('year', true);
    }

    if (!validateEmail(email)) {
      this.changeValidation('email', false);
      submitChanges = false;
    } else {
      this.changeValidation('email', true);
    }

    const cityStateZipValidated = await this.validateCityZipState();
    if (cityStateZipValidated) {
      this.changeValidation('city_zip_state', true);
    } else {
      this.changeValidation('city_zip_state', false);
      submitChanges = false;
    }
    return submitChanges;
  }

  checkSignInValidations = () => {
    const { passwordSignIn, usernameSignIn } = this.state;
    let submitChanges = true;
  
    if (!validateUsername(usernameSignIn)) {
      this.changeValidation('usernameSignIn', false);
      submitChanges = false;
    } else {
      this.changeValidation('usernameSignIn', true);
    }
    if (!validateUsername(passwordSignIn)) {
      this.changeValidation('passwordSignIn', false);
      submitChanges = false;
    } else {
      this.changeValidation('passwordSignIn', true);
    }
    return submitChanges;
  }

  newUser = async () => {
    await fetch(`${process.env.REACT_APP_DEV_API_DOMAIN}/users/signup`, {
      method: 'POST',
      body: JSON.stringify({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        birth_date: `${this.state.year}-${this.state.month}-${this.state.date}`,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode,
        annotation: this.state.annotation
      }),
      headers: {
        'Content-type': 'application/json'
      }
    });
  }

  newSignIn = async () => {
    const response = await fetch(`${process.env.REACT_APP_DEV_API_DOMAIN}/users/signin`, {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.usernameSignIn,
        password: this.state.passwordSignIn,
      }),
      headers: {
        'Content-type': 'application/json'
      }
    });
    const token = await response.json();
    localStorage.setItem('token', token.token);
    localStorage.setItem('username', token.username);
    localStorage.setItem('user_Id', token.id);
    this.changeValidation('currentUser', token.username);
    return token;
  }

  signedOut = () => {
    localStorage.clear();
    this.props.history.go('/');
  }
    
  newClose = async () => {
    const result = await this.checkAllInputValidations();
    if (result) {
      this.changeValidation('city_zip_state', true);
      await this.setState({ usernameSignIn: this.state.username, passwordSignIn: this.state.password });
      await this.newUser();
      await this.newSignIn();
      this.signBothClose();
      // WILL CHANGE DO NOT USE WINDOW
      window.location.reload();
    } else {
      this.changeValidation('city_zip_state', false);
    }
  }

  signInSubmit = async () => {
    const result = this.checkSignInValidations();
    const { token, message } = await this.newSignIn();
    if (result && token !== undefined && token !== null) {
      this.signBothClose();
      // WILL CHANGE DO NOT USE WINDOW
      window.location.reload();
    } else {
      alert(message);
      this.changeValidation('errorSignIn', false);
    }
  }
  
  render() {
    const { 
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
      annotation,
      submittedName,
      submittedEmail,
      signInModalOpen,
      signUpModalOpen,
      validations,
      passwordSignIn,
      usernameSignIn
    } = this.state;
    
    return (
      <div className="navbar-container">
        <Menu attached='top' tabular >
          <Menu.Item className="stoke-bar">
            S T O K E_A L E R T_
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>
              { 
                !this.isTokenAvailable()
                  ? (
                    <ModalSignIn
                      submittedName={submittedName}
                      submittedEmail={submittedEmail}
                      handleSubmit={this.handleSubmit}
                      handleChange={this.handleChange}
                      upClose={this.signInClose}
                      inModalOpen={signInModalOpen}
                      inCloseConfig={this.signInCloseConfig}
                      signInSubmit={this.signInSubmit}
                      validations={validations}
                      signBothClose={this.signBothClose}
                      passwordSignIn={passwordSignIn}
                      usernameSignIn={usernameSignIn}
                    />
                  )     
                  : ''}
              {
                !this.isTokenAvailable()
                  ? (
                    <ModalSignUp
                      first_name={first_name}
                      lastname={last_name}
                      username={username}
                      password={password}
                      retypepassword={retype_password}
                      email={email}
                      month={month}
                      date={date}
                      year={year}
                      city={city}
                      state={state}
                      zipcode={zipcode}
                      about={annotation}
                      submittedName={submittedName}
                      submittedEmail={submittedEmail}
                      handleSubmit={this.handleSubmit}
                      handleChange={this.handleChange}
                      upClose={this.signUpClose}
                      upModalOpen={signUpModalOpen}
                      upCloseConfig={this.signUpCloseConfig}
                      newClose={this.newClose}
                      validations={validations}
                      signBothClose={this.signBothClose}
                    />
                  )
                  : ''
              }
              <Button id="login" onClick={this.signedOut}>
                {
                  this.state.validations.signedIn 
                    ? (
                      <Popup trigger={<Icon name="close" />} content='Sign-out of your account' /> 
                    )        
                    : <Icon name="close" /> 
                }
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Menu className="file-menu" attached='top' tabular>
          <Menu.Item 
            name='home' 
            active={this.props.location.pathname === '/home'} 
            onClick={this.handleItemClick}
          >
            <span className="under-line">H</span>
            <span>ome</span>
          </Menu.Item> 
          <Menu.Item 
            name='post/new'
            active={this.props.location.pathname === '/post/new'}
            onClick={this.handleItemClick}
          >
            <span className="under-line">N</span>
            <span>ew Post</span>
          </Menu.Item>
          <Menu.Item
            name='profile'
            active={this.props.location.pathname === '/profile'}
            onClick={this.handleItemClick}
          >
            <span className="under-line">P</span>
            <span>rofile</span>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default withRouter(MenuExampleTabularOnTop);