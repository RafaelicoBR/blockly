/**
 * Blockly Apps: Bird Blocks
 *
 * Copyright 2013 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Blocks for Blockly's Bird application.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

// Extensions to Blockly's language and JavaScript generator.

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.Language.bird_hungry = {
  // Block for hungry condition.
  helpUrl: '',
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendTitle(BlocklyApps.getMsg('Bird_hungry'));
    this.setOutput(true, 'Boolean');
    this.setTooltip(BlocklyApps.getMsg('Bird_hungryTooltip'));
  }
};

Blockly.JavaScript.bird_hungry = function() {
  // Generate JavaScript for hungry condition.
  return ['Bird.isHungry', Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.Language.bird_heading = {
  // Block for moving bird in a direction.
  helpUrl: '',
  init: function() {
    this.setColour(290);
    this.appendDummyInput()
        .appendTitle(BlocklyApps.getMsg('Bird_heading'))
        .appendTitle(new Blockly.FieldAngle('90'), 'ANGLE');
    this.setPreviousStatement(true);
    this.setTooltip(BlocklyApps.getMsg('Bird_headingTooltip'));
  }
};

Blockly.JavaScript.bird_heading = function() {
  // Generate JavaScript for moving bird in a direction.
  var dir = this.getTitleValue('ANGLE');
  return 'Bird.heading(' + dir + ', \'block_id_' + this.id + '\');\n';
};

Blockly.Language.bird_position = {
  // Block for getting bird's x or y position.
  helpUrl: '',
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown([['x', 'X'], ['y', 'Y']]), 'XY');
    this.setOutput(true, 'Number');
    this.setTooltip(BlocklyApps.getMsg('Bird_positionTooltip'));
  }
};

Blockly.JavaScript.bird_position = function() {
  // Generate JavaScript for getting bird's x or y position.
  var code = 'Bird.' + this.getTitleValue('XY');
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.Language.bird_compare = {
  // Block for comparing bird's x or y position with a number.
  helpUrl: Blockly.LANG_LOGIC_COMPARE_HELPURL,
  init: function() {
    if (Blockly.RTL) {
      var OPERATORS = [['>', 'LT'], ['<', 'GT']];
    } else {
      var OPERATORS = [['<', 'LT'], ['>', 'GT']];
    }
    this.setColour(210);
    this.setOutput(true, 'Boolean');
    this.appendValueInput('A')
        .setCheck('Number');
    this.appendValueInput('B')
        .setCheck('Number')
        .appendTitle(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getTitleValue('OP');
      return thisBlock.TOOLTIPS[op];
    });
  }
};

Blockly.Language.bird_compare.TOOLTIPS = {
  LT: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LT,
  GT: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GT
};

Blockly.JavaScript.bird_compare = function() {
  // Generate JavaScript for comparing bird's x or y position with a number.
  var operator = (this.getTitleValue('OP') == 'LT') ? '<' : '>';
  var order = Blockly.JavaScript.ORDER_RELATIONAL;
  var argument0 = Blockly.JavaScript.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Language.bird_and = {
  // Block for logical operator 'and'.
  helpUrl: Blockly.LANG_LOGIC_OPERATION_HELPURL,
  init: function() {
    this.setColour(210);
    this.setOutput(true, 'Boolean');
    this.appendValueInput('A')
        .setCheck('Boolean');
    this.appendValueInput('B')
        .setCheck('Boolean')
        .appendTitle('and', 'AND');
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_LOGIC_OPERATION_TOOLTIP_AND);
  }
};

Blockly.JavaScript.bird_and = function() {
  // Generate JavaScript for logical operator 'and'.
  var order = Blockly.JavaScript.ORDER_LOGICAL_AND;
  var argument0 = Blockly.JavaScript.valueToCode(this, 'A', order) || 'false';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'B', order) || 'false';
  var code = argument0 + ' && ' + argument1;
  return [code, order];
};

Blockly.Language.bird_ifElse = {
  // Block for 'if/else'.
  helpUrl: Blockly.LANG_CONTROLS_IF_HELPURL,
  init: function() {
    this.setColour(210);
    this.appendValueInput("CONDITION")
        .appendTitle(BlocklyApps.getMsg('Bird_if'))
        .setCheck("Boolean");
    this.appendStatementInput('DO')
        .appendTitle(BlocklyApps.getMsg('Bird_doCode'));
    this.appendStatementInput('ELSE')
        .appendTitle(BlocklyApps.getMsg('Bird_elseCode'));
    this.setDeletable(false);
    this.setTooltip(Blockly.LANG_CONTROLS_IF_TOOLTIP_2);
  }
};

Blockly.JavaScript.bird_ifElse = function() {
  // Generate JavaScript for 'if/else' conditional.
  var argument = Blockly.JavaScript.valueToCode(this, 'CONDITION',
                 Blockly.JavaScript.ORDER_ATOMIC) || 'false';
  var branch0 = Blockly.JavaScript.statementToCode(this, 'DO');
  var branch1 = Blockly.JavaScript.statementToCode(this, 'ELSE');
  var code = 'if (' + argument + ') {\n' + branch0 +
             '} else {\n' + branch1 + '}\n';
  return code;
};

Blockly.Language.controls_if.oldInit = Blockly.Language.controls_if.init;

Blockly.Language.controls_if.init = function() {
  this.oldInit();
  this.setPreviousStatement(false);
  this.setNextStatement(false);
  this.setDeletable(false);
};

Blockly.Language.bql_select = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(120);
    this.appendValueInput("SELECT")
        .setCheck("Field")
        .appendTitle("select");
    this.appendStatementInput("FROM")
        .setCheck("Table")
        .appendTitle("from");
    this.setPreviousStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript.bql_select = function() {
  var value_select = Blockly.JavaScript.valueToCode(this, 'SELECT', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_from = Blockly.JavaScript.statementToCode(this, 'FROM');
  // TODO: Assemble JavaScript into code variable.
  var code = '...'
  return code;
};

Blockly.Language.bql_select_agg = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(120);
    this.appendValueInput("SELECT")
        .setCheck("Field")
        .appendTitle("select");
    this.appendStatementInput("FROM")
        .setCheck("Table")
        .appendTitle("from");
    this.appendValueInput("GROUP_BY")
        .setCheck("Field")
        .appendTitle("group by");
    this.setPreviousStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript.bql_select_agg = function() {
  var value_select = Blockly.JavaScript.valueToCode(this, 'SELECT', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_from = Blockly.JavaScript.statementToCode(this, 'FROM');
  var value_group_by = Blockly.JavaScript.valueToCode(this, 'GROUP_BY', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...'
  return code;
};

Blockly.Language.bql_aggregate = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(230);
    this.appendValueInput("FIELD")
        .appendTitle(new Blockly.FieldDropdown(this.AGG_LIST), "AGG");
    this.appendDummyInput()
        .appendTitle("as")
        .appendTitle(new Blockly.FieldTextInput("alias"), "ALIAS");
    this.setInputsInline(true);
    this.setOutput(true, "Field");
    this.setTooltip('perform aggregation on a column');
  }
};

Blockly.Language.bql_aggregate.AGG_LIST =
[["count", "COUNT"],
 ["count distinct", "COUNTD"],
 ["sum", "SUM"],
 ["min", "MIN"],
 ["max", "MAX"],
 ["average", "AVERAGE"]];

Blockly.JavaScript.bql_aggregate = function() {
  var value_field = Blockly.JavaScript.valueToCode(this, 'FIELD', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_agg = this.getTitleValue('AGG');
  var text_alias = this.getTitleValue('ALIAS');
  // TODO: Assemble JavaScript into code variable.
  var code = '...'
  return code;
};

Blockly.Language.bql_field = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldTextInput("table_name"), "TABLE")
        .appendTitle('.')
        .appendTitle(new Blockly.FieldTextInput("field1"), "FIELD");
    this.setOutput(true, "Field");
    this.setTooltip('');
  }
};

Blockly.JavaScript.bql_field = function() {
  var text_table = this.getTitleValue('TABLE');
  var text_field = this.getTitleValue('FIELD');
  // TODO: Assemble JavaScript into code variable.
  var code = '...'
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Language.bql_table = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldTextInput("schema_name"), "SCHEMA")
        .appendTitle('.')
        .appendTitle(new Blockly.FieldTextInput("table_name"), "TABLE");
    this.setPreviousStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript.bql_table = function() {
  var text_schema = this.getTitleValue('SCHEMA');
  var text_table = this.getTitleValue('TABLE');
  // TODO: Assemble JavaScript into code variable.
  var code = '...'
  return code;
};

Blockly.Language.bql_join = {
  helpUrl: 'http://www.example.com/',
  init: function() {
    this.setColour(230);
    this.appendStatementInput("TAB1")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(new Blockly.FieldTextInput("t1"), "TABLE_ALIAS_1");
    this.appendStatementInput("TAB2")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(new Blockly.FieldDropdown([["inner", "INNER"], ["left", "LEFT"], ["right", "RIGHT"]]), "JOIN")
        .appendTitle("join")
        .appendTitle(new Blockly.FieldTextInput("t2"), "TABLE_ALIAS_2");
    this.appendValueInput("KEYL")
        .appendTitle("on");
    this.appendValueInput("KEYR")
        .appendTitle("=");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript.bql_join = function() {
  var statements_tab1 = Blockly.JavaScript.statementToCode(this, 'TAB1');
  var statements_tab2 = Blockly.JavaScript.statementToCode(this, 'TAB2');
  var value_keyl = Blockly.JavaScript.valueToCode(this, 'KEYL', Blockly.JavaScript.ORDER_ATOMIC);
  var value_keyr = Blockly.JavaScript.valueToCode(this, 'KEYR', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_join = this.getTitleValue('JOIN');
  var text_table_alias_2 = this.getTitleValue('TABLE_ALIAS_2');
  var text_table_alias_1 = this.getTitleValue('TABLE_ALIAS_1');
  // TODO: Assemble JavaScript into code variable.
  var code = '...'
  return code;
};

/////////////////////////
Blockly.Language.bql_select_mutate = {
  // Create a list with any number of elements of any type.
  helpUrl: '',
  init: function() {
    this.setColour(120);
    this.appendValueInput('SELECT_0')
        .setCheck('Field')
        .appendTitle('select');
    this.appendStatementInput('FROM')
        .setCheck('Table')
        .appendTitle('from');
    this.setPreviousStatement(true);
    this.setTooltip('Expandable select statement.\n' +
                    'Click on + sign to add more fields to select or group by.');
    this.setMutator(new Blockly.Mutator(['bql_select_mutate_field']));
    this.selectCount_ = 1;
    this.groupByCount_ = 0;
  },
  mutationToDom: function(workspace) {
    var container = document.createElement('mutation');
    container.setAttribute('selectFields', this.selectCount_);
    container.setAttribute('groupByFields', this.groupByCount_);
    return container;
  },
  domToMutation: function(container) {
    // Create XML for SELECT_
    for (var x = 0; x < this.selectCount_; x++) {
      this.removeInput('SELECT_' + x);
    }
    this.selectCount_ = window.parseInt(container.getAttribute('selectFields'), 10);
    for (var x = 0; x < this.selectCount_; x++) {
      var input = this.appendValueInput('SELECT_' + x);
      if (x == 0) {
        input.appendTitle('select');
      }
      this.moveInputBefore('SELECT_' + x, 'FROM');
    }
    if (this.selectCount_ == 0) {
      this.appendDummyInput('EMPTY')
          .appendTitle('Do you see this title?');
    }

    // Create XML for GROUP_BY_
    for (var x = 0; x < this.groupByCount_; x++) {
      this.removeInput('GROUP_BY_' + x);
    }
    this.groupByCount_ = window.parseInt(container.getAttribute('groupByFields'), 10);
    for (var x = 0; x < this.groupByCount_; x++) {
      var input = this.appendValueInput('GROUP_BY_' + x);
      if (x == 0) {
        input.appendTitle('group by');
      }
    }
  },
  decompose: function(workspace) {
    var containerBlock = new Blockly.Block(workspace, 'bql_select_mutate_container');
    containerBlock.initSvg();
    // SELECT_
    var selectConnection = containerBlock.getInput('SELECT_STACK').connection;
    for (var x = 0; x < this.selectCount_; x++) {
      var selectBlock = new Blockly.Block(workspace, 'bql_select_mutate_field');
      selectBlock.initSvg();
      selectConnection.connect(selectBlock.previousConnection);
      selectConnection = selectBlock.nextConnection;
    }
    // GROUP_BY_
    var groupByConnection = containerBlock.getInput('GROUP_BY_STACK').connection;
    for (var x = 0; x < this.groupByCount_; x++) {
      var groupByBlock = new Blockly.Block(workspace, 'bql_select_mutate_field');
      groupByBlock.initSvg();
      groupByConnection.connect(groupByBlock.previousConnection);
      groupByConnection = groupByBlock.nextConnection;
    }

    // Set the WHERE_TICK checkbox in container to 'TRUE' or 'FALSE'.
    var whereClause = this.getInput('WHERE');
    if (whereClause) {
      containerBlock.setTitleValue('TRUE', 'WHERE_TICK');
    } else {
      containerBlock.setTitleValue('FALSE', 'WHERE_TICK');
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Disconnect all input blocks and remove all SELECT_ inputs.
    if (this.selectCount_ == 0) {
      this.removeInput('EMPTY');
    } else {
      for (var x = this.selectCount_ - 1; x >= 0; x--) {
        this.removeInput('SELECT_' + x);
      }
    }
    this.selectCount_ = 0;
    // Rebuild the block's inputs.
    var selectBlock = containerBlock.getInputTargetBlock('SELECT_STACK');
    while (selectBlock) {
      var inputName = 'SELECT_' + this.selectCount_;
      var input = this.appendValueInput(inputName);
      if (this.selectCount_ == 0) {
        input.appendTitle('select');
      }
      this.moveInputBefore(inputName, 'FROM');
      // Reconnect any child blocks.
      if (selectBlock.valueConnection_) {
        input.connection.connect(selectBlock.valueConnection_);
      }
      this.selectCount_++;
      selectBlock = selectBlock.nextConnection &&
          selectBlock.nextConnection.targetBlock();
    }
    if (this.selectCount_ == 0) {
      this.appendDummyInput('EMPTY')
          .appendTitle('select (MUST SELECT A FIELD!)');
      this.moveInputBefore('EMPTY', 'FROM');
    }

    // Disconnect all input blocks and remove all GROUP_BY_ inputs.
    for (var x = this.groupByCount_ - 1; x >= 0; x--) {
      this.removeInput('GROUP_BY_' + x);
    }
    this.groupByCount_ = 0;
    // Rebuild the block's inputs.
    var groupByBlock = containerBlock.getInputTargetBlock('GROUP_BY_STACK');
    while (groupByBlock) {
      console.log(groupByBlock);
      var input = this.appendValueInput('GROUP_BY_' + this.groupByCount_);
      if (this.groupByCount_ == 0) {
        input.appendTitle('group by');
      }
      // Reconnect any child blocks.
      if (groupByBlock.valueConnection_) {
        input.connection.connect(groupByBlock.valueConnection_);
      }
      this.groupByCount_++;
      groupByBlock = groupByBlock.nextConnection &&
          groupByBlock.nextConnection.targetBlock();
    }

    // Add or remove a WHERE_ input statement in the block based on Container.
    var whereTick = containerBlock.getTitleValue('WHERE_TICK');
    var whereInput = this.getInput('WHERE');
    if (whereTick == 'TRUE') {
      if (!whereInput) {
        // If 'WHERE_TICK' is checked but no WHERE input statement is found.
        var whereInput = this.appendValueInput('WHERE')
                          .setCheck('Boolean')
                          .appendTitle('where');
        // Reconnect WHERE's child block if it exists & not connected elsewhere.
        if (containerBlock.whereConnection_ &&
            !containerBlock.whereConnection_.targetConnection) {
          whereInput.connection.connect(containerBlock.whereConnection_);
        }
      }
    } else {
      if (whereInput) {
        this.removeInput('WHERE');
      }
    }
  },
  saveConnections: function(containerBlock) {
    // Store a pointer to any connected SELECT_ child blocks.
    var selectBlock = containerBlock.getInputTargetBlock('SELECT_STACK');
    var x = 0;
    while (selectBlock) {
      var input = this.getInput('SELECT_' + x);
      selectBlock.valueConnection_ = input && input.connection.targetConnection;
      x++;
      selectBlock = selectBlock.nextConnection &&
          selectBlock.nextConnection.targetBlock();
    }

    // Store a pointer to any connected GROUP_BY_ child blocks.
    var groupByBlock = containerBlock.getInputTargetBlock('GROUP_BY_STACK');
    var x = 0;
    while (groupByBlock) {
      var input = this.getInput('GROUP_BY_' + x);
      groupByBlock.valueConnection_ = input && input.connection.targetConnection;
      x++;
      groupByBlock = groupByBlock.nextConnection &&
          groupByBlock.nextConnection.targetBlock();
    }

    // Store a pointer to the connected WHERE child block if it exists.
    var whereInput = this.getInput('WHERE');
    if (whereInput) {
      containerBlock.whereConnection_ = whereInput.connection.targetConnection;
    }
  }
};

Blockly.Language.bql_select_mutate_container = {
  // Container.
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle('select');
    this.appendStatementInput('SELECT_STACK');
    this.appendDummyInput()
        .appendTitle("where clause")
        .appendTitle(new Blockly.FieldCheckbox('FALSE'), 'WHERE_TICK');
    this.appendDummyInput()
        .appendTitle('group by');
    this.appendStatementInput('GROUP_BY_STACK');
    this.setTooltip('Set up the structure of your select statement here.');
    this.appendDummyInput()
        .appendTitle("order clause")
        .appendTitle(new Blockly.FieldCheckbox('FALSE'), 'ORDER_TICK');
    this.contextMenu = false;
  }
};

Blockly.Language.bql_select_mutate_field = {
  // Add fields.
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle('field');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('field or column you want to select or group by');
    this.contextMenu = false;
  }
};
