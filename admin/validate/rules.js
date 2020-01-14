const rules = {
    organName:[
        { required: true, message: '请输入机构名称', trigger: ['blur', 'change'] }
    ],
    organDesc:[
        { required: true, message: '请输入机构描述', trigger: ['blur', 'change'] }
    ],
    roleName:[
        { required: true, message: '请输入角色名称', trigger: ['blur', 'change'] }
    ],
    roleDesc:[
        { required: true, message: '请输入角色描述', trigger: ['blur', 'change'] }
    ], 
    userName:[
        { required: true, message: '请输入用户名称', trigger: ['blur', 'change'] }
    ],               
    organPerson:[
        { required: true, message: '请输入负责人', trigger: 'blur' },
    ],
    logName:[
        { required: true, message: '请输入登录名称', trigger: 'blur' },
    ],
    phone: [
        { required: true, trigger: ['blur', 'change'],message: '请输入手机号码'  },
        {pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
        message: '请输入正确的手机号',
        trigger: ['blur', 'change']}
    ],
    email:[
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ],

}  

export default rules