function modifiersFromObj(baseClass, modifiers) {
    let modifiersClasses = [];
    for (const modifier in modifiers) {
        modifiersClasses.push(createModifier(baseClass, modifier, modifiers[modifier]));
    }
    return modifiersClasses;
}

function createModifier(baseClass, modifierName, modifierValue) {
    if (!modifierValue || modifierValue === false) return '';
    let className = `${baseClass}--${modifierName}`;
    if (modifierValue && modifierValue !== true) {
        className += `-${modifierValue}`;
    }
    return className;
}

module.exports = options => Component => {

    const {block, modifiers} = options;

    Object.assign(Component.prototype, {

        block(passedmodifiers = {}) {
            let classesSet = [];
            if (this.props.className) {
                classesSet.push(this.props.className);
            }

            classesSet.push(block);

            const
                modifiersFromProps = (modifiers || [])
                    .filter(modifierName => !!this.props[modifierName])
                    .map(modifierName => createModifier(block, modifierName, this.props[modifierName])),
                modifiersFromArguments = modifiersFromObj(block, passedmodifiers);

            classesSet.push(...modifiersFromProps, ...modifiersFromArguments);

            return classesSet.join(' ');
        },

        element(elementName, modifiers) {
            const
                elementClass = `${block}__${elementName}`,
                modifiersClasses = modifiersFromObj(elementClass, modifiers);

            return [
                elementClass,
                ...modifiersClasses
            ].join(' ');
        }
    });

    return Component;

};
