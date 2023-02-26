// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "goods_sn": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "title": "货号",
    "label": "货号"
  },
  "name": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "title": "名称",
    "label": "名称"
  },
  "keywords": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "关键字",
    "label": "关键字"
  },
  "goods_desc": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "详细描述",
    "label": "详细描述"
  },
  "goods_thumb": {
    "rules": [
      {
        "format": "string"
      },
      {
        "pattern": "^(http://|https://|/|./|@/)\\S"
      }
    ],
    "title": "缩略图地址",
    "label": "缩略图地址"
  },
  "goods_banner_imgs": {
    "rules": [
      {
        "format": "array"
      }
    ]
  },
  "remain_count": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "int"
      }
    ],
    "title": "库存数量",
    "label": "库存数量"
  },
  "month_sell_count": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "defaultValue": 0
  },
  "total_sell_count": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "defaultValue": 0
  },
  "comment_count": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "defaultValue": 0
  },
  "is_on_sale": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "title": "是否上架",
    "defaultValue": false,
    "label": "是否上架"
  },
  "is_hot": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "defaultValue": false
  },
  "add_date": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "defaultValue": {
      "$env": "now"
    }
  },
  "last_modify_date": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "defaultValue": {
      "$env": "now"
    }
  },
  "seller_note": {
    "rules": [
      {
        "format": "string"
      }
    ]
  }
}

const enumConverter = {}

function filterToWhere(filter, command) {
  let where = {}
  for (let field in filter) {
    let { type, value } = filter[field]
    switch (type) {
      case "search":
        if (typeof value === 'string' && value.length) {
          where[field] = new RegExp(value)
        }
        break;
      case "select":
        if (value.length) {
          let selectValue = []
          for (let s of value) {
            selectValue.push(command.eq(s))
          }
          where[field] = command.or(selectValue)
        }
        break;
      case "range":
        if (value.length) {
          let gt = value[0]
          let lt = value[1]
          where[field] = command.and([command.gte(gt), command.lte(lt)])
        }
        break;
      case "date":
        if (value.length) {
          let [s, e] = value
          let startDate = new Date(s)
          let endDate = new Date(e)
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
      case "timestamp":
        if (value.length) {
          let [startDate, endDate] = value
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
    }
  }
  return where
}

export { validator, enumConverter, filterToWhere }
