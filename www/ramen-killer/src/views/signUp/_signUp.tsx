import React from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Col, Input, Row, Divider } from 'antd';
import axios from 'axios';
import swal from "sweetalert";

import {
    // インプット
    signUpFormUserIdState,
    signUpFormPassWordState,
    signUpFormReInputPassWordState,
    signUpFormEmailState,
    // エラーメッセージ
    signUpFormUserIdErrorState,
    signUpFormPassWordErrorState,
    signUpFormReInputPassWordErrorState,
    signUpFormEmailErrorState
} from "../../atoms/signUpFormState";
import {useRecoilState} from "recoil";

const redirectPathToLogin = '/login';

const SignUp: () => JSX.Element = () => {
    const [signUpFormUserId, setSignUpFormUserId] = useRecoilState(signUpFormUserIdState);
    const [signUpFormEmail, setSignUpFormEmail] = useRecoilState(signUpFormEmailState);
    const [signUpFormPassWord, setSignUpFormPassWord] = useRecoilState(signUpFormPassWordState);
    const [signUpFormReInputPassWord, setSignUpFormReInputPassWord] = useRecoilState(signUpFormReInputPassWordState);
    const [signUpFormUserIdError, setSignUpFormUserIdError] = useRecoilState(signUpFormUserIdErrorState);
    const [signUpFormPassWordError, setSignUpFormPassWordError] = useRecoilState(signUpFormPassWordErrorState);
    const [signUpFormReInputPassWordError, setSignUpFormReInputPassWordError] = useRecoilState(signUpFormReInputPassWordErrorState);
    const [signUpFormEmailError, setSignUpFormEmailError] = useRecoilState(signUpFormEmailErrorState);
    const [passwordVisible, setPasswordVisible] = React.useState(false);

    interface validationRuleType {
        rule: string;
        message: string;
    }

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

    const onChangeUserIdHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const formInputs = event.target.value;
        const validationRules: validationRuleType[] = [
            {
                'rule': 'required',
                'message': 'UserId is required'
            },
            // TODO:バリデーションチェック
            // {
            //     'rule': '^(?=.*[A-Z])(?=.*[.?/-])[a-zA-Z0-9.?/-]{4,15}$',
            //     'message':'characters you can use are these \'a-Z, 0-9, ./?-!@#$%&*()_+\' '
            // }
        ];
        const errorMessage: string = validationCheck(formInputs, validationRules);
        setSignUpFormUserIdError(errorMessage);
        setSignUpFormUserId(formInputs);
    }

    const onChangeEmailHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const formInputs = event.target.value;
        const validationRules: validationRuleType[] = [
            {
                'rule': 'required',
                'message': 'Email is required'
            },
            // TODO:バリデーションチェック
            // {
            //     'rule': '^(?=.*[A-Z])(?=.*[.?/-])[a-zA-Z0-9.?/-]{4,15}$',
            //     'message':'characters you can use are these \'a-Z, 0-9, ./?-!@#$%&*()_+\' '
            // }
        ];
        const errorMessage: string = validationCheck(formInputs, validationRules);
        setSignUpFormEmailError(errorMessage);
        setSignUpFormEmail(formInputs);
    }

    const onChangePassWordHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const formInputs = event.target.value;
        const validationRules: validationRuleType[] = [
            {
                'rule': 'required',
                'message': 'Password is required'
            },
            // TODO:バリデーションチェック
            // {
            //     'rule': '^(?=.*[A-Z])(?=.*[.?/-])[a-zA-Z0-9.?/-]{4,15}$',
            //     'message':'characters you can use are these \'a-Z, 0-9, ./?-!@#$%&*()_+\' '
            // }
        ];
        const errorMessage: string = validationCheck(formInputs, validationRules);
        setSignUpFormPassWordError(errorMessage);
        setSignUpFormPassWord(formInputs);
    }
    const onChangeReInputPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        // TODO:バリデーションチェック
        const formInputs = event.target.value;
        const validationRules: validationRuleType[] = [
            {
                'rule': 'required',
                'message': 'Password(ReInput) is required'
            },
            // TODO:バリデーションチェック
            // {
            //     'rule': '^(?=.*[A-Z])(?=.*[.?/-])[a-zA-Z0-9.?/-]{4,15}$',
            //     'message':'characters you can use are these \'a-Z, 0-9, ./?-!@#$%&*()_+\' '
            // }
        ];
        const errorMessage: string = validationCheck(formInputs, validationRules);
        setSignUpFormReInputPassWordError(errorMessage);
        setSignUpFormReInputPassWord(formInputs);
    }

    const submitSignUp = (): void => {
        const formInputData = {
            'uid':signUpFormUserId,
            'email': signUpFormEmail,
            'password': signUpFormPassWord,
            'reinputPassword': signUpFormReInputPassWord
        };

        // TODO: 【低】バリデーションエラーがあったら送らない API実装後にやる

        console.log('sendData is ', formInputData);
        void axios.get('/sanctum/csrf-cookie').then(response => {
            void axios.post('/api/signUp', formInputData).then(res => {
                if(res.data.status === 200){
                    console.log('成功レスポンス',res.data.status);
                    void swal("Success", res.data.message, "success").then(response => {
                        console.log('成功',response);
                        window.location.href = redirectPathToLogin;
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
                <h2>SIGN UP</h2>
                <div className="sign-up">
                    <Divider/>
                    <Row>
                        <Col span={3} offset={6} style={{marginRight:0}}>
                            <p>UserId</p>
                        </Col>
                        <Col span={9} offset={6} style={{marginLeft:0}}>
                            <p className={"form-error"}>&nbsp;{signUpFormUserIdError}</p>
                            <Input required
                                   placeholder="moltoUser"
                                   value={signUpFormUserId}
                                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => { onChangeUserIdHandler(event); }}
                            />
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col span={3} offset={6} style={{marginRight:0}}>
                            <p>Email</p>
                        </Col>
                        <Col span={9} offset={6} style={{marginLeft:0}}>
                            <p className={"form-error"}>&nbsp;{signUpFormEmailError}</p>
                            <Input required
                                   placeholder="moltoUser"
                                   value={signUpFormEmail}
                                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => { onChangeEmailHandler(event); }}
                            />
                        </Col>
                    </Row>

                    {/* // TODO: プロトタイプでは電話番号認証はしない
                    <Row>
                        <Col span={3} offset={6} style={{marginRight:0}}>
                            <p>phoneNumber</p>
                        </Col>
                        <Col span={9} offset={6} style={{marginLeft:0}}>
                            <Input required placeholder="090-1234-5678" />
                        </Col>
                    </Row>
                    */}
                    <Divider/>
                    <Row>
                        <Col span={3} offset={6} style={{marginRight:0}}>
                            <p>Password</p>
                        </Col>
                        <Col span={9} offset={6} style={{marginLeft:0}}>
                            <p className={"form-error"}>&nbsp;{signUpFormPassWordError}</p>
                            <Input.Password required
                                            placeholder="inputStrongPassWord"
                                            iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                            value={signUpFormPassWord}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { onChangePassWordHandler(event); }}
                                            visibilityToggle={{visible: passwordVisible, onVisibleChange: setPasswordVisible}}
                            />
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col span={3} offset={6} style={{marginRight:0}}>
                            <p>Password (ReInput)</p>
                        </Col>
                        <Col span={9} offset={6} style={{marginLeft:0}}>
                            <p className={"form-error"}>&nbsp;{signUpFormReInputPassWordError}</p>
                            <Input.Password required
                                            placeholder="inputStrongPassWord"
                                            iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                            value={signUpFormReInputPassWord}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { onChangeReInputPasswordHandler(event); }}
                                            visibilityToggle={{visible: passwordVisible, onVisibleChange: setPasswordVisible}}
                            />
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col span={3} offset={6} style={{marginRight:0}}>
                        </Col>
                        <Col span={9} offset={6} style={{marginLeft:0}}>
                            <Button style={{width: 80}} type="primary" onClick={submitSignUp}>signUp</Button>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col span={3} offset={6} style={{marginRight:0}}>
                        </Col>
                        <Col span={9} offset={6} style={{marginLeft:0}}>
                            <span>please </span>
                            <a href={redirectPathToLogin}>login</a>
                            <span> if you have a account.</span>
                        </Col>
                    </Row>
                </div>
            </section>
        </div>
    );
};

export default SignUp;