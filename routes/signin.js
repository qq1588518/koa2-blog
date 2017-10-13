/**
 * Created by lailai on 2017/10/11.
 * 登录路由
 */
var router=require('koa-router')();
var userModel=require('../lib/mysql.js');
var md5=require('md5');
//登录页面
router.get('/signin',async(ctx,next)=>{
    await ctx.render('signin',{
        session: ctx.session
    })
});
//登录提交
router.post('/signin',async(ctx,next)=>{
    console.log(ctx.request.body);
    var name=ctx.request.body.name;
    var password=ctx.request.body.password;
    await userModel.findDataByName(name).then(result=>{
        var res=JSON.parse(JSON.stringify(result));
        console.log(res);
        console.log(result);
        if(name==res[0]['name'] && md5(password)==res[0]['pass']){
            ctx.body='true';
            ctx.session.user=res[0]['name'];
            ctx.session.id=res[0]['id'];
            console.log('ctx.session.id',ctx.session.id);
            console.log('session',ctx.session);
            console.log('登录成功');
        }
    }).catch(err=>{
        ctx.body='false';
        console.log('用户名或密码错误');
    })
});
module.exports=router;
