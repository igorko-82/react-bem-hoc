'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function modifiersFromObj(baseClass, modifiers) {
    var modifiersClasses = [];
    for (var modifier in modifiers) {
        modifiersClasses.push(createModifier(baseClass, modifier, modifiers[modifier]));
    }
    return modifiersClasses;
}

function createModifier(baseClass, modifierName, modifierValue) {
    if (!modifierValue || modifierValue === false) return '';
    var className = baseClass + '--' + modifierName;
    if (modifierValue && modifierValue !== true) {
        className += '-' + modifierValue;
    }
    return className;
}

module.exports = function (options) {
    return function (Component) {
        var _block = options.block,
            modifiers = options.modifiers;


        Object.assign(Component.prototype, {
            block: function block() {
                var _this = this;

                var passedmodifiers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                var classesSet = [];
                if (this.props.className) {
                    classesSet.push(this.props.className);
                }

                classesSet.push(_block);

                var modifiersFromProps = (modifiers || []).filter(function (modifierName) {
                    return !!_this.props[modifierName];
                }).map(function (modifierName) {
                    return createModifier(_block, modifierName, _this.props[modifierName]);
                }),
                    modifiersFromArguments = modifiersFromObj(_block, passedmodifiers);

                classesSet.push.apply(classesSet, _toConsumableArray(modifiersFromProps).concat(_toConsumableArray(modifiersFromArguments)));

                return classesSet.join(' ');
            },
            element: function element(elementName, modifiers) {
                var elementClass = _block + '__' + elementName,
                    modifiersClasses = modifiersFromObj(elementClass, modifiers);

                return [elementClass].concat(_toConsumableArray(modifiersClasses)).join(' ');
            }
        });

        return Component;
    };
};
