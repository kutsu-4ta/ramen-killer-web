import React from 'react';
import {Link} from 'react-router-dom';
import { Button, Col, Input, Row, Divider } from 'antd';
import axios from "axios";
import swal from "sweetalert";
import {useRecoilState} from "recoil";
import {
    // インプット
    loginFormUidOrEmailState,
    loginFormUidOrEmailErrorState,
    loginFormPasswordState,
    loginFormPasswordErrorState,
} from "../../atoms/loginFormState";
import {authenticationState} from "../../atoms/authenticationState";

interface validationRuleType {
    rule: string;
    message: string;
}

const redirectPathToSignUp = '/signUp';
const redirectPathToHome   = '/home';

const Login: () => JSX.Element = () => {
    const [loginFormUidOrEmail, setLoginFormUidOrEmail] = useRecoilState(loginFormUidOrEmailState);
    const [loginFormUidOrEmailError, setLoginFormUidOrEmailError] = useRecoilState(loginFormUidOrEmailErrorState);
    const [loginFormPassword, setLoginFormPassword] = useRecoilState(loginFormPasswordState);
    const [loginFormPasswordError, setLoginFormPasswordError] = useRecoilState(loginFormPasswordErrorState);
    const [authentication, setAuthentication] = useRecoilState(authenticationState);

    const validationCheck = (inputForm: string, validationRules: validationRuleType[]): string => {
        const errors: string[] = validationRules.map((rule) => {
            const isCheckRequired = rule.rule === 'required';
            const isFilled = inputForm.length > 0;

            // 必須
            if( isCheckRequired ){
                if(!isFilled){
                    console.log(inputForm, '必須');
                    return rule.message;
                }
                return '';
            }

            if (isFilled && (inputForm.match(rule.rule) == null)) {
                return rule.message;
            }
            return '';
        });

        let errorMessage = '';
        errors.forEach((error: string) => {
            if (error !== '') {
                errorMessage += error;
            }
        });

        return errorMessage;
    }

    const onChangeUidOrEmailHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const formInputs = event.target.value;
        const validationRules: validationRuleType[] = [
            {
                'rule': 'required',
                'message': 'UId or Email is required'
            },
            // TODO:バリデーションチェック
            // {
            //     'rule': '^(?=.*[A-Z])(?=.*[.?/-])[a-zA-Z0-9.?/-]{4,15}$',
            //     'message':'characters you can use are these \'a-Z, 0-9, ./?-!@#$%&*()_+\' '
            // }
        ];
        const errorMessage: string = validationCheck(formInputs, validationRules);
        setLoginFormUidOrEmailError(errorMessage);
        setLoginFormUidOrEmail(formInputs);
    }

    const onChangePasswordHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const formInputs = event.target.value;
        const validationRules: validationRuleType[] = [
            {
                'rule': 'required',
                'message': 'PassWord is required'
            },
            // TODO:バリデーションチェック
            // {
            //     'rule': '^(?=.*[A-Z])(?=.*[.?/-])[a-zA-Z0-9.?/-]{4,15}$',
            //     'message':'characters you can use are these \'a-Z, 0-9, ./?-!@#$%&*()_+\' '
            // }
        ];
        const errorMessage: string = validationCheck(formInputs, validationRules);
        setLoginFormPasswordError(errorMessage);
        setLoginFormPassword(formInputs);
    }

    const submitLogin = (): void => {
        const formInputData = {
            'uidOrEmail':loginFormUidOrEmail,
            'password': loginFormPassword,
        };

        // TODO: 【低】バリデーションエラーがあったら送らない API実装後にやる

        console.log('sendData is ', formInputData);
        void axios.get('/sanctum/csrf-cookie').then(response => {
            void axios.post('/api/signIn', formInputData).then(res => {
                if(res.data.status === 200){
                    // console.log('成功レスポンス',res.data);
                    const uid = res.data.uid;
                    const name = res.data.name;
                    const email = res.data.email;
                    const token = res.data.token;
                    setAuthentication({
                        uid,
                        name,
                        email,
                        token
                    });
                    console.log('authentication',authentication, res.data);
                    void swal("Success", res.data.message, "success").then(response => {
                        // console.log('成功',response, authentication,redirectPathToHome);
                        window.location.href = redirectPathToHome;
                    });
                    // history.pushState('/')
                } else {
                    console.log('失敗レスポンス',res.data.validation_errors);
                    void swal("Failed", res.data.message, "error").then(response => { console.log('失敗',response); });
                }
            });
        });
    }

    return (
        <div className="container" style={{color: "#d7d7d7", paddingLeft: 30}}>
            <section className="featured">
                <h2>LOGIN</h2>
                <div className="login">
                    <Divider/>
                    <Row>
                        <Col span={3} offset={6} style={{marginRight:0}}>
                            <p>UserId or Email</p>
                        </Col>
                        <Col span={9} offset={6} style={{marginLeft:0}}>
                            <p className={"form-error"}>&nbsp;{loginFormUidOrEmailError}</p>
                            <Input required
                                   placeholder="moltoUser"
                                   value={loginFormUidOrEmail}
                                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => { onChangeUidOrEmailHandler(event); }}
                            />
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col span={3} offset={6} style={{marginRight:0}}>
                            <p>Password</p>
                        </Col>
                        <Col span={9} offset={6} style={{marginLeft:0}}>
                            <p className={"form-error"}>&nbsp;{loginFormPasswordError}</p>
                            <Input required
                                   placeholder="moltoUser"
                                   value={loginFormPassword}
                                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => { onChangePasswordHandler(event); }}
                            />
                        </Col>
                    </Row>
                    <Divider/>
                    <Divider/>
                    <Row>
                        <Col span={3} offset={6} style={{marginRight:0}}>
                        </Col>
                        <Col span={9} offset={6} style={{marginLeft:0}}>
                            <Button style={{width: 80}} type="primary" onClick={submitLogin}>login</Button>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col span={3} offset={6} style={{marginRight:0}}>
                        </Col>
                        <Col span={9} offset={6} style={{marginLeft:0}}>
                            <span>please </span>
                            <Link to={redirectPathToSignUp}>sign up</Link>
                            <span> if you do not have any account.</span>
                        </Col>
                    </Row>
                </div>
            </section>
        </div>
    );
};

export default Login;