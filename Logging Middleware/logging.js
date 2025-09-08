const ValidStack = ["backend", "frontend"];
const ValidLevel = ["debug", "info", "warn", "error", "fatal"];

export async function Log(stack,level,pkg,message){
    stack = stack.toLowerCase();
    level = level.toLowerCase();
    pkg = pkg.toLowerCase();
    if (!allowedStacks.includes(stack)) {
        throw new Error(`Invalid stack: ${stack}`);
    }

    if (!allowedLevels.includes(level)) {
        throw new Error(`Invalid level: ${level}`);
    }
    try{
        const x={stack, level, packge, message, timestamp: new Date().toISOString()};

        const response = await fetch("http://20.244.56.144/evaluation-service/logs",{
            method: "POST",
            headers: { "Content-Type": "application/json",},
            body: JSON.stringify(x),
        });

        if (!response.ok){
            console.error("Failed:", response.statusText);
        }
    }
    catch (err){
        console.error("Error occured in logging:", err);
    }
}