const fs = require('fs');

// 读取映射
const lines = fs.readFileSync('.zcode/fetch_map_round3.txt', 'utf8').split('\n').filter(l => l.trim());

// 命名修正表（错误名 → 正确名）
const fixes = {
  '集合-接口-列出上下文': '集合-接口-List接口',
  '二维图形-Set接口': '二维图形-多页文档',
  '集合-api-design': '集合-互操作性-API设计',
  '集合-compatibility': '集合-互操作性-兼容性',
  '聚合操作-parallelism': '聚合操作-并行',
  '聚合操作-reduction': '聚合操作-归约',
  '日期时间-遗留文件IO': '日期时间-遗留日期时间代码',
  '接口与继承-createinterface': '接口与继承-创建接口',
  '接口与继承-interfaces-answers': '接口与继承-接口练习答案',
  '类与对象-creating-questions': '类与对象-创建类练习',
  '类与对象-objects-questions': '类与对象-对象练习',
  '类与对象-nested-questions': '类与对象-嵌套类练习',
  '类与对象-enum-questions': '类与对象-枚举练习',
  '类与对象-classvars': '类与对象-类成员',
  'JDBC-基础-gettingstarted': 'JDBC-基础-入门',
  '部署-Applet-security': '部署-Applet-安全',
  '安全-step2': '安全-设置策略文件',
  'Swing-button': 'Swing-按钮',
  '扩展机制-spi': '扩展机制-服务提供者机制',
  'Java入门-index-gs': 'Java入门-入门索引',
  'Java入门-cando': 'Java入门-Java能做什么',
  'Java入门-application': 'Java入门-HelloWorld应用',
  '日期时间-index-dt': '日期时间-日期时间概述',
  '自定义网络-index-net': '自定义网络-网络概述',
  '面向对象概念-questions': '面向对象概念-问题练习',
  '数字与字符串-formatting': '数字与字符串-格式化',
  'Java泛型-why': 'Java泛型-为什么用泛型',
  '注解-basics': '注解-注解基础',
  '注解-declaring': '注解-声明注解类型',
  '注解-predefined': '注解-预定义注解类型',
  '注解-type_annotations': '注解-类型注解',
  '注解-repeating': '注解-重复注解',
  '包-packages': '包-创建使用包',
  '语言基础-variables-nb': '语言基础-变量',
  'JMX-standard': 'JMX-标准MBeans',
  'JMX-why': 'JMX-为何使用JMX',
  'JMX-architecture': 'JMX-JMX架构',
  'JMX-javavm': 'JMX-JVM监控管理',
  'JAXP-when': 'JAXP-何时使用SAX',
  'RMI-designing': 'RMI-设计远程接口',
  'RMI-implementing': 'RMI-实现远程接口',
  'RMI-compiling': 'RMI-编译示例',
  'RMI-running': 'RMI-运行示例',
};

const out = [];
for (const line of lines) {
  const [url, name] = line.split('\t');
  const fixed = fixes[name] || name;
  out.push(url + '\t' + fixed);
}
fs.writeFileSync('.zcode/fetch_map_round3.txt', out.sort().join('\n') + '\n', 'utf8');
console.log('已修正命名，共', out.length, '条');
