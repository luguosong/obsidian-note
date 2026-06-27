const fs = require('fs');
const path = require('path');

// 扫描 网页裁剪/ 下所有 .md，提取所有 docs.oracle.com/javase/tutorial/ 的页面链接
const dir = '网页裁剪';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

// 父主题映射（URL 路径段 → 中文前缀），与已抓取笔记命名风格保持一致
// 参考已有的笔记命名：二维图形-xxx、集合-xxx、Java核心类库-xxx 等
const topicPrefix = {
  '2d': '二维图形',
  'collections': '集合',
  'essential': 'Java核心类库',
  'extra': '',
  'deployment': '部署',
  'i18n': '国际化',
  'java': '',
  'javabeans': 'JavaBeans',
  'jaxp': 'JAXP',
  'jdbc': 'JDBC',
  'jmx': 'JMX',
  'jndi': 'JNDI',
  'reflect': '反射',
  'rmi': 'RMI',
  'security': '安全',
  'sound': '声音',
  'uiswing': 'Swing',
  'ext': '扩展机制',
  'datetime': '日期时间',
  'networking': '自定义网络',
  'getStarted': '入门',
  'extra/generics': '泛型进阶',
  'extra/fullscreen': '全屏独占模式'
};

// 子主题中文映射表（从 URL 文件名 → 中文名）
// 这是关键：需要为每个页面取中文名
const subNameMap = {
  // 2d
  'coordinate': '坐标系', 'rendering': '渲染', 'primitives': '几何原语',
  'images': '图像', 'printing': '打印', 'text': '文本',
  'dialog': '打印设置对话框', 'gui': '打印GUI内容', 'printable': '基本打印程序',
  'services': '打印服务', 'set': '多页文档', 'swing': 'Swing打印支持',
  'advanced': '高级文本显示', 'fonts': '物理与逻辑字体', 'measuringtext': '测量文本',
  'drawonimage': '创建绘制图像', 'saveimage': '保存图像', 'loadimage': '加载图像',
  // collections
  'collection': 'Collection接口', 'set': 'Set接口', 'list': 'List接口',
  'queue': 'Queue接口', 'deque': 'Deque接口', 'map': 'Map接口',
  'sorted-set': 'SortedSet接口', 'sorted-map': 'SortedMap接口', 'order': '对象排序',
  'wrapper': '包装器实现',
  // essential/concurrency
  'highlevel': '高级并发对象', 'pthreads': '进程与线程', 'simple': '线程同步',
  'interfere': '线程干扰', 'memconsist': '内存一致性错误', 'sync': '同步',
  'waitnotify': 'wait与notify', 'immutable': '不可变对象', 'guardlocks': '保护块',
  'lock_objects': '锁对象', 'executors': '执行器', 'forkjoin': 'fork/join框架',
  'threadlocal': 'ThreadLocal', 'collections': '并发集合',
  // essential/environment
  'config': '配置实用工具', 'cmdLineArgs': '命令行参数', 'env': '环境变量',
  'other': '其他配置', 'system': '系统实用工具', 'cl': '命令行IO对象',
  'sysprop': '系统属性', 'security': '安全管理器', 'sysmisc': 'System其他方法',
  'paths': 'PATH与CLASSPATH',
  // essential/io
  'bytestreams': '字节流', 'charstreams': '字符流', 'buffers': '缓冲流',
  'scanfor': '扫描与格式化', 'scanning': '扫描', 'formatting': '格式化',
  'datastreams': '数据流', 'objectstreams': '对象流', 'fileio': '文件IO',
  'path': '什么是路径', 'pathClass': 'Path类', 'pathOps': '路径操作',
  'fileOps': '文件操作', 'check': '检查文件目录', 'delete': '删除文件目录',
  'copy': '复制文件目录', 'move': '移动文件目录', 'fileAttr': '管理元数据',
  'file': '读写创建文件', 'rafs': '随机访问文件', 'dirs': '创建读取目录',
  'links': '链接', 'walk': '遍历文件树', 'find': '查找文件',
  'notification': '监视目录变化', 'misc': '其他方法', 'legacy': '遗留文件IO',
  'summary': '总结',
  // essential/regex
  'intro': '简介', 'literals': '字符串字面量', 'char_classes': '字符类',
  'pre_char_classes': '预定义字符类', 'quant': '量词', 'groups': '捕获组',
  'bounds': '边界匹配器', 'pattern': 'Pattern方法', 'matcher': 'Matcher方法',
  'pse': 'PatternSyntaxException方法', 'resources': '附加资源', 'test_harness': '测试工具',
  // java/IandI
  'createinterface': '创建接口', 'multipleinheritancetype': '多重继承类型',
  'abstract': '抽象方法', 'defaultmethods': '默认方法',
  'interfaces-answers': '接口练习答案',
  // java/javaOO
  'classes': '类', 'classdecl': '声明类', 'variables': '声明成员变量',
  'methods': '方法', 'constructors': '构造器', 'arguments': '传递信息',
  'objects': '对象', 'objectcreation': '创建对象', 'usingobject': '使用对象',
  'more': '更多关于类', 'returnvalue': '返回值', 'thiskey': 'this关键字',
  'accesscontrol': '访问控制', 'classvars': '类成员', 'initial': '初始化字段',
  'summaryclasses': '创建使用类总结',
  'nested': '嵌套类', 'innerclasses': '内部类示例', 'localclasses': '局部类',
  'anonymousclasses': '匿名类', 'lambdaexpressions': 'Lambda表达式',
  'methodreferences': '方法引用', 'whentouse': '何时使用嵌套类', 'enum': '枚举类型',
  'creating-questions': '创建类练习', 'objects-questions': '对象练习',
  'nested-questions': '嵌套类练习', 'enum-questions': '枚举练习',
  // java/concepts
  'object': '什么是对象', 'class': '什么是类', 'inheritance': '什么是继承',
  'interface': '什么是接口', 'package': '什么是包', 'questions': '问题练习',
  // java/data
  'numbers': '数字', 'strings': '字符串', 'formatting': '格式化',
  // java/generics
  'why': '为什么用泛型',
  // java/nutsandbolts
  'variables-nb': '变量',
  // java/annotations
  'basics': '注解基础', 'declaring': '声明注解类型', 'predefined': '预定义注解类型',
  'type_annotations': '类型注解', 'repeating': '重复注解',
  // java/package
  'packages': '创建使用包',
  // javabeans
  'project': '创建项目', 'button': '按钮是Bean', 'wiring': '连接应用', 'addbean': '使用第三方Bean',
  'properties': '属性', 'methods-jb': '方法', 'events': '事件', 'beaninfo': '使用BeanInfo',
  'persistence': 'Bean持久化', 'longpersistence': '长期持久化', 'customization': 'Bean定制',
  // jaxp
  'when': '何时使用SAX',
  // jdbc/basics
  'gettingstarted': '入门', 'processingsqlstatements': '处理SQL语句',
  'connecting': '建立连接', 'sqldatasources': 'DataSource连接', 'sqlexception': '处理SQLException',
  'tables': '设置表', 'retrieving': '检索修改值', 'prepared': '预编译语句',
  'transactions': '事务', 'rowset': 'RowSet对象', 'jdbcrowset': 'JdbcRowSet',
  'cachedrowset': 'CachedRowSet', 'joinrowset': 'JoinRowSet',
  'filteredrowset': 'FilteredRowSet', 'webrowset': 'WebRowSet',
  'sqltypes': '高级数据类型', 'blob': '大对象', 'sqlxml': 'SQLXML对象',
  'array': 'Array对象', 'distinct': 'DISTINCT类型',
  'sqlstructured': '结构化对象', 'sqlcustommapping': '自定义类型映射',
  'sqldatalink': 'Datalink对象', 'sqlrowid': 'RowId对象',
  'storedprocedures': '存储过程', 'jdbcswing': 'JDBC与GUI',
  // jmx
  'standard': '标准MBeans', 'mxbeans': 'MXBeans', 'why': '为何使用JMX', 'architecture': 'JMX架构',
  'javavm': 'JVM监控管理',
  // jndi
  'naming': '命名功能', 'dir': '目录功能',
  'lookup': '查找对象', 'list': '列出上下文', 'bind': '添加绑定',
  'rename': '重命名对象', 'create': '创建子上下文',
  'factory': '对象工厂', 'store': '存储读取对象', 'reference': '引用',
  'dn': '检索DN', 'controls-std': '标准LDAP控件', 'ldapname': 'LDAP名称操作',
  'readtimeout': '读取超时',
  // reflect
  'classNew': '检索类对象', 'classModifiers': '类修饰符类型',
  'classMembers': '发现类成员', 'classTrouble': '类故障排除',
  'fieldTypes': '字段类型', 'fieldModifiers': '字段修饰符',
  'fieldValues': '字段值', 'fieldTrouble': '字段故障排除',
  'methodType': '方法类型', 'methodparameterreflection': '方法参数名',
  'methodModifiers': '方法修饰符', 'methodInvocation': '调用方法',
  'methodTrouble': '方法故障排除',
  'ctorLocation': '查找构造器', 'ctorModifiers': '构造器修饰符',
  'ctorInstance': '创建实例', 'ctorTrouble': '构造器故障排除',
  'arrayComponents': '识别数组类型', 'arrayInstance': '创建新数组',
  'arraySetGet': '数组值', 'arrayTrouble': '数组故障排除',
  'enumMembers': '检查枚举', 'enumSetGet': '枚举字段', 'enumTrouble': '枚举故障排除',
  // rmi
  'designing': '设计远程接口', 'implementing': '实现远程接口',
  'compiling': '编译示例', 'running': '运行示例',
  // deployment
  'security': '安全',
  // security
  'step2': '设置策略文件',
  // uiswing
  'button': '按钮', 'slider': '滑块',
  // ext
  'spi': '服务提供者机制',
  // getStarted
  'index-gs': '入门索引', 'cando': 'Java能做什么',
  'netbeans': 'NetBeans版', 'unix': 'SolarisLinuxMac版', 'win32': 'Windows版',
  'application': 'HelloWorld应用',
  // datetime
  'index-dt': '日期时间概述',
  // networking
  'index-net': '自定义网络概述'
};

function urlToName(url) {
  // 去掉锚点和查询参数
  url = url.split('#')[0];
  // 解析路径段
  const m = url.match(/\/tutorial\/(.+)$/);
  if (!m) return null;
  const parts = m[1].split('/');
  // 最后一段去掉 .html 和 index
  let last = parts[parts.length - 1].replace(/\.html$/, '');
  if (last === 'index' || last === '') {
    // index.html 是目录索引页，对应父主题笔记
    parts.pop();
    return null; // 通常是已抓取的父页
  }

  // 确定父主题前缀
  let prefix = '';
  const fullPath = parts.join('/');
  // 优先匹配更长的路径（extra/generics 优先于 extra）
  for (const [p, name] of Object.entries(topicPrefix)) {
    if (p && fullPath.startsWith(p) && p.length > (prefix[1] || '').length) {
      // 重新通过简单逻辑
    }
  }
  // 简化：逐段判断
  if (parts[0] === 'extra' && parts[1] === 'generics') prefix = '泛型进阶';
  else if (parts[0] === 'extra' && parts[1] === 'fullscreen') prefix = '全屏独占模式';
  else if (parts[0] === 'extra') prefix = '';
  else if (parts[0] === 'java' && parts[1] === 'IandI') prefix = '接口与继承';
  else if (parts[0] === 'java' && parts[1] === 'javaOO') prefix = '类与对象';
  else if (parts[0] === 'java' && parts[1] === 'concepts') prefix = '面向对象概念';
  else if (parts[0] === 'java' && parts[1] === 'data') prefix = '数字与字符串';
  else if (parts[0] === 'java' && parts[1] === 'generics') prefix = 'Java泛型';
  else if (parts[0] === 'java' && parts[1] === 'nutsandbolts') prefix = '语言基础';
  else if (parts[0] === 'java' && parts[1] === 'annotations') prefix = '注解';
  else if (parts[0] === 'java' && parts[1] === 'package') prefix = '包';
  else if (parts[0] === 'java') prefix = '学习Java语言';
  else if (parts[0] === 'essential' && parts[1] === 'concurrency') prefix = '并发';
  else if (parts[0] === 'essential' && parts[1] === 'environment') prefix = 'Java核心类库-平台环境';
  else if (parts[0] === 'essential' && parts[1] === 'io') prefix = 'Java核心类库-基本IO';
  else if (parts[0] === 'essential' && parts[1] === 'regex') prefix = 'Java核心类库-正则表达式';
  else if (parts[0] === 'essential') prefix = 'Java核心类库';
  else if (parts[0] === '2d') prefix = '二维图形';
  else if (parts[0] === 'collections' && parts[1] === 'streams') prefix = '聚合操作';
  else if (parts[0] === 'collections' && parts[1] === 'interfaces') prefix = '集合-接口';
  else if (parts[0] === 'collections' && parts[1] === 'implementations') prefix = '集合-实现';
  else if (parts[0] === 'collections') prefix = '集合';
  else if (parts[0] === 'deployment' && parts[1] === 'applet') prefix = '部署-Applet';
  else if (parts[0] === 'deployment' && parts[1] === 'webstart') prefix = '部署-WebStart';
  else if (parts[0] === 'deployment') prefix = '部署';
  else if (parts[0] === 'i18n') prefix = '国际化';
  else if (parts[0] === 'javabeans' && parts[1] === 'quick') prefix = 'JavaBeans-快速入门';
  else if (parts[0] === 'javabeans' && parts[1] === 'writing') prefix = 'JavaBeans-编写组件';
  else if (parts[0] === 'javabeans' && parts[1] === 'advanced') prefix = 'JavaBeans-高级主题';
  else if (parts[0] === 'javabeans') prefix = 'JavaBeans';
  else if (parts[0] === 'jaxp') prefix = 'JAXP';
  else if (parts[0] === 'jdbc' && parts[1] === 'basics') prefix = 'JDBC-基础';
  else if (parts[0] === 'jdbc' && parts[1] === 'overview') prefix = 'JDBC-概述';
  else if (parts[0] === 'jdbc') prefix = 'JDBC';
  else if (parts[0] === 'jmx' && parts[1] === 'mbeans') prefix = 'JMX-MBeans';
  else if (parts[0] === 'jmx') prefix = 'JMX';
  else if (parts[0] === 'jndi') prefix = 'JNDI';
  else if (parts[0] === 'reflect' && parts[1] === 'class') prefix = '反射-类';
  else if (parts[0] === 'reflect' && parts[1] === 'member') prefix = '反射-成员';
  else if (parts[0] === 'reflect' && parts[1] === 'special') prefix = '反射-数组与枚举';
  else if (parts[0] === 'reflect') prefix = '反射';
  else if (parts[0] === 'rmi') prefix = 'RMI';
  else if (parts[0] === 'security') prefix = '安全';
  else if (parts[0] === 'sound') prefix = '声音';
  else if (parts[0] === 'uiswing') prefix = 'Swing';
  else if (parts[0] === 'ext') prefix = '扩展机制';
  else if (parts[0] === 'getStarted') prefix = 'Java入门';
  else if (parts[0] === 'datetime') prefix = '日期时间';
  else if (parts[0] === 'networking') prefix = '自定义网络';

  // 取中文名
  let zh = subNameMap[last] || last;
  return prefix ? prefix + '-' + zh : zh;
}

// 收集所有未本地化的页面链接
const allLinks = new Set();
const linkInFile = {}; // url -> [files]
for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const matches = content.matchAll(/\]\((https?:\/\/docs\.oracle\.com\/javase\/tutorial\/[^)]+)\)/g);
  for (const m of matches) {
    let url = m[1].split('#')[0]; // 去锚点
    // 排除代码文件、图片、API文档、lookup
    if (/\.(java|png|jpg|jpeg|gif|zip)$/.test(url)) continue;
    if (/\/8\/docs\/api/.test(url)) continue;
    if (/pls\/topic\/lookup/.test(url)) continue;
    if (/\/examples\//.test(url)) continue;
    // 去掉 index.html 尾巴，规范化
    url = url.replace(/\/index\.html$/, '/');
    allLinks.add(url);
    if (!linkInFile[url]) linkInFile[url] = new Set();
    linkInFile[url].add(f);
  }
}

// 输出待抓取 URL → 拟定文件名映射
const newUrls = [];
for (const url of allLinks) {
  const name = urlToName(url);
  if (name) {
    // 检查对应笔记是否已存在
    const notePath = path.join(dir, name + '.md');
    const exists = fs.existsSync(notePath);
    if (!exists) {
      newUrls.push(url + '\t' + name);
    }
  }
}

console.log('待抓取页面URL数:', newUrls.length);
fs.writeFileSync('.zcode/fetch_map_round3.txt', newUrls.sort().join('\n') + '\n', 'utf8');
console.log('已写入 .zcode/fetch_map_round3.txt');
