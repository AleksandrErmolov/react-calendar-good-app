import { Button, Form, Input } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useTypeSelector } from '../hooks/useTypedSelector'
import { AuthActionCreators } from '../store/reducers/auth/actions-creator'
import { rules } from '../utils/rules'

export const LoginForm: FC = () => {

  const dispatch = useDispatch()
  const { isLoading, error } = useTypeSelector(state => state.auth)

  const submit = () => {
    dispatch(AuthActionCreators.login('user', '1233'))
  }


  return (


    <Form
      onFinish={submit}
    >
{error && <div style={{color:'red'}}>
  {error}
  </div>}

      <Form.Item
        label="Username"
        name="username"
        rules={[rules.required('Пожалуйста введите имя пользователя')]}
      >
        <Input />
      </Form.Item>



      <Form.Item
        label="Password"
        name="password"
        rules={[rules.required('Пожалуйста введите пароль')]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>


    </Form>

  )
}
