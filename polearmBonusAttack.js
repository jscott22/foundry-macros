function updateWeapon(weapon, damage, name) {
    weapon.update({
        data: {
            damage: {
                parts: [damage]
            }
        },
        name
    });
}

function getWeapon() {
    return actor.items.find(i => i.data.data.actionType === "mwak" && i.data.data.equipped && i.data.name !== "Unarmed Strike");
}

let weapon = getWeapon();

console.log("Original Weapon: ", weapon);

if (weapon) {
    const attackBonus = weapon.data.data.attackBonus;
    const originalDamage = weapon.data.data.damage.parts[0];
    const originalName = weapon.name;
    const damage = [`1d4 + @mod + ${attackBonus}`, 'bludgeoning'];

    updateWeapon(weapon, damage, `${originalName} - Bonus Attack`);

    weapon = getWeapon();

    console.log("Modified Weapon: ", weapon);


    weapon.roll().then(() => {
        setTimeout(() =>
            updateWeapon(weapon, originalDamage, originalName), 2000
        )
        // setName(weapon, originalName);
        // setDamage(weapon, originalDamage);
        console.log("Restored Weapon: ", getWeapon());
    });
}