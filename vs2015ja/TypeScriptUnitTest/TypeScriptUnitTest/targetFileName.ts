class TargetClassName {
    public static PlusArguments(first: number, second: number, third: number): number {

        if (first > 10) throw new Error("first に 10 より大きい値が指定されました。10 以下の値を指定してください。");
        if (second > 100) throw new Error("second に 100 より大きい値が指定されました。100 以下の値を指定してください。");
        if (third > 1000) throw new Error("third に 1000 より大きい値が指定されました。1000 以下の値を指定してください。");

        return first + second + third;
    }
}