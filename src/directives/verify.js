/*eslint-disable */
import Vue from 'vue'
function VaConfig(type, typeVal, errMsg, name, tag){
    this.type = type, this.typeVal = typeVal, this.errMsg = errMsg, this.name = name, this.tag = tag
}
let showErr=(name,con)=>{
    var ERR_MSG = {
        nonvoid: `${name}不能为空`,
        reg: `${name}格式错误`,
        unique: `${name}重复`
    };
    alert(ERR_MSG[con['type']])
}
let check=(v,conten)=>{
    var res = 0;                                        //0代表OK, 若为数组代表是某个字段的错误
    //验证函数
    var cfg = {
        //非空
        nonvoid: (v, bool)=>{
            if(bool){
                return v.trim() ? 0 : ['nonvoid'];
            }else{
                return 0;
            }
        },
        reg:(v, reg)=> reg.test(v) ? 0 : ['reg'],                //正则
        limit:(v, interval)=> (+v >= interval[0] && +v <= interval[1]) ? 0 : ['limit', interval],
        equal: (v, target)=>{                                                        //和什么相等
            var _list = document.getElementsByName(target), _target
            for(var i = 0;i < _list.length;i++){
                if(_list[i].className.indexOf('va') > -1){
                  _target = _list[i];
                }
            }
            return (_target.value === v) ? 0 : ['equal', _target.getAttribute('tag')]
        },
        unique:(v)=>{
            var _list = document.getElementsByClassName('unique'),
                valList = [].map.call(_list, item=>item.value)
            return (unique(valList).length === valList.length) ? 0 : ['unique']
        }
    }

    var result=cfg[conten["type"]]&&cfg[conten["type"]](v,conten["typeVal"]);
    return result;
}
let vconfig={};
Vue.directive('verify',{
    bind(el, binding, vnode){console.log(binding)
        let vm=vnode.context,
            arg=binding.arg,
            options=binding.modifiers,
            direName=binding.name,
            elName=el.name,
            elTag=el.getAttribute('tag'),
            errMsg=el.getAttribute('regMsg');
        var newVa=(type,typeVal)=>{return new VaConfig(type,typeVal,errMsg,direName,elTag);};
        if(!options.trim){//默认验证空
          vconfig[elName]=newVa("nonvoid",true);
        }
        if(options.change){//失焦验证开启
            el.addEventListener('change',function(){
                let _result=check(el.value,vconfig[el.name]);
                if(_result){
                    showErr(elTag,vconfig[el.name])
                }
            })
        }
        if(options.fn){
            binding.value.map(item=>{
                let type = Object.keys(item)[0];
                if(type === 'fn'){
                    // console.log(item.fn)
                    // return vm[item.fn](el.value,vconfig[el.name])
                }else{
                    // if(type === 'unique'){
                    //   addClass(el, 'unique')
                    // }
                    // return eazyNew(type, item[type])
                }
            })
        }
    }
})
Vue.directive('va-submit',{
    bind(el, binding, vnode){
        var vm = vnode.context;
        el.addEventListener('click', function(){
            var domList = document.getElementsByClassName('input');
            vm.vaVal || (vm.vaVal = {})
            for(let i = 0;i < domList.length;i++){
                var dom = domList[i],
                    name = dom.name,
                    value = dom.value,
                    elTag=dom.getAttribute('tag'),
                    errMsg=dom.getAttribute('regMsg'),
                    conditions = vconfig[name];
                let _result=check(value,conditions);
                if(_result){
                    //如果返回的是字符串，则为自定义报错； 如果是数组，则使用showErr 报错
                    showErr(elTag,conditions)
                    return
                }
            }
            //校验通过的回调
            // layer.msgWarn('全部校验成功')
            alert("全部校验成功")
        })
    }
})
