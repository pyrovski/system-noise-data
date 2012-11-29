function [result] = readFile(filename)
    file = fopen(filename, 'r');
    comment = true;
    while(comment)
        line = fgetl(file);
        if(line(1) ~= '#')
            comment = false;
        end
    end
    [data, count] = fscanf(file, '%f %f');
    fclose(file);

    result = [data(1:2:end), data(2:2:end)];
end
