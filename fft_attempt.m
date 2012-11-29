for i = 496:511
    filename = strcat('rzmerl154.',num2str(i),'.dat');
    a{i-495} = readFile(filename);
end
