
import yaml from 'js-yaml';

export function convertJsonToYaml(jsonData) {
    try {
        const yamlData = yaml.dump(jsonData);
        return yamlData;
    } catch (error) {
        console.error('Error converting JSON to YAML:', error);
        return null;
    }
}

export function convertYamlToJson(yamlData) {
    try {
        const jsonData = yaml.load(yamlData);
        return jsonData;
    } catch (error) {
        console.error('Error converting YAML to JSON:', error);
        return null;
    }
}

export function isValidJsonOrYaml(content) {
    try {
        // 尝试解析为 JSON
        JSON.parse(content);
        return 'json'; // 解析成功，内容为合法的 JSON
    } catch (jsonError) {
        try {
            // 尝试解析为 YAML
            yaml.load(content);
            return 'yaml'; // 解析成功，内容为合法的 YAML
        } catch (yamlError) {
            return false; // 解析失败，内容既不是 JSON 也不是 YAML
        }
    }
}