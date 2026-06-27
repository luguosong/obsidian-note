---
分类:
  - "网页裁剪"
标题: "Grant the Required Permission (The Java™ Tutorials >        
            Security Features in Java SE > Creating a Policy File)"
描述: "This security Java tutorial describes usage of digital signatures, keys, and cryptography services"
来源: "https://docs.oracle.com/javase/tutorial/security/tour1/wstep2.html"
发布者: "Oracle-"
发布时间:
创建时间: "2026-06-27T18:00:00+08:00"
---

Documentation

[[安全-设置策略文件|Set up a Policy File to Grant the Required Permission]]

[[安全-策略文件-wstep1|Start Policy Tool]]

Grant the Required Permission

[[安全-策略文件-wstep3|Save the Policy File]]

[[安全-策略文件-wstep1|« Previous]] • [Trail](https://docs.oracle.com/javase/tutorial/security/TOC.html) • [[安全-策略文件-wstep3|Next »]]

The Java Tutorials have been written for JDK 8. Examples and practices described in this page don't take advantage of improvements introduced in later releases and might use technology no longer available.  
See [Dev.java](https://dev.java/learn/) for updated tutorials taking advantage of the latest releases.  
See [Java Language Changes](https://docs.oracle.com/pls/topic/lookup?ctx=en/java/javase&id=java_language_changes) for a summary of updated language features in Java SE 9 and subsequent releases.  
See [JDK Release Notes](https://www.oracle.com/technetwork/java/javase/jdk-relnotes-index-2162236.html) for information about new features, enhancements, and removed or deprecated options for all JDK releases.

## Grant the Required Permission

To create a new entry, click the **Add Policy Entry** button in the main Policy Tool window. This displays the Policy Entry dialog box as shown in the following figure.

![the Policy Entry dialog](https://docs.oracle.com/javase/tutorial/figures/security/AddEntryBlank1.gif)

A policy entry specifies one or more permissions for code from a particular *code source* - code from a particular location (URL), code signed by a particular entity, or both.

The **CodeBase** and the **SignedBy** text boxes specify which code you want to grant the permission(s) you will be adding in the file.

- A **CodeBase** value indicates the code source location; you grant the permission(s) to code from that location. An empty **CodeBase** entry signifies "any code" -- it does not matter where the code originates.
- A **SignedBy** value indicates the alias for a certificate stored in a keystore. The public key within that certificate is used to verify the digital signature on the code. You grant permission to code signed by the private key corresponding to the public key in the keystore entry specified by the alias. The **SignedBy** entry is optional; omitting it signifies "any signer" -- it does not matter whether the code is signed, or by whom.

If you have both a **CodeBase** and a **SignedBy** entry, the permission(s) are granted only to code that is both from the specified location *and* signed by the named alias.

You can grant permission to all code from the location (URL) where examples are stored.

Type the following URL into the **CodeBase** text box of the Policy Entry dialog box:

```
https://docs.oracle.com/javase/tutorial/security/tour1/examples/
```

**Note:** This is a URL. Therefore, it must always use slashes as separators, not backslashes.

Leave the **SignedBy** text box blank, since you aren't requiring the code to be signed.

---

**Note:** To grant the permission to any code (`.class` file) not just from the directory specified previously but from the `security` directory *and its subdirectories*, type the following URL into the **CodeBase** box:

```
https://docs.oracle.com/javase/tutorial/security/
```

---

You have specified where the code comes from (the **CodeBase**), and that the code does not have to be signed (since there is no **SignedBy** value).

You have now specified this policy entry, so click the **Done** button in the Policy Entry dialog. The Policy Tool window now contains a line representing the policy entry, showing the `CodeBase` value.

![the PolicyTool window, showing the new policy entry](https://docs.oracle.com/javase/tutorial/figures/security/WQ1ptOneCB1.gif)

**Note:** We will be granting permissions to this new policy entry in the next lesson.